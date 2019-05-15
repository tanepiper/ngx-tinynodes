import { Inject, Injectable, NgZone } from '@angular/core';
import EditorJS, { EditorConfig } from '@editorjs/editorjs';
import { BehaviorSubject, Observable, combineLatest, Subject } from 'rxjs';
import { Block } from '../types/blocks';
import { EditorJSConfig, NgxEditorJSConfig, NGX_EDITORJS_CONFIG } from '../types/config';
import { BlocksMap, ChangeMap, EditorMap, ReadyMap } from '../types/maps';
import { EditorJSFactory } from '../utils/editorjs-injector';
import { NgxEditorJSPluginService } from './plugins.service';
import { filter, takeUntil } from 'rxjs/operators';

/**
 * The NgxEditorJSService provides control EditorJS instances via Angular.
 * The service has several maps:
 * - A map of `EditorJS` instances
 * - A map of `BehaviorSubject` containing the current array of blocks
 * - A map of ready states
 * The are generated from the last save made on that instance
 */
@Injectable({
  providedIn: 'root'
})
export class NgxEditorJSService {
  /**
   * Internal map of all EditorJS instances
   */
  private editorMap: EditorMap = {};

  /**
   * Internal map of all Block `BehaviorSubject` instances
   */
  private blocksMap: BlocksMap = {};

  /**
   * Internal map of all EditorJS ready states
   */
  private readyMap: ReadyMap = {};

  /**
   * Internal map of all EditorJS change states
   */
  private changeMap: ChangeMap = {};

  constructor(
    @Inject(NGX_EDITORJS_CONFIG) private config: NgxEditorJSConfig,
    private readonly editorFactory: EditorJSFactory,
    private readonly plugins: NgxEditorJSPluginService,
    private zone: NgZone
  ) {}

  /**
   * This method creates a new EditorJS instance and adds it to the editor map.
   * If there is an existing editor it will clean up first before creating a new one
   * @param holder The ID of the holder of the instance
   * @param blocks Optional initial set of blocks to render in the editor
   * @param excludeTools String array of keys to not include with this editor
   * @param autoSave When an instance changes we update the block map, set to false if you want to disable
   */
  public async createEditor(config: EditorJSConfig, includeTools?: string[], autoSave = true): Promise<void> {
    if (this.editorMap[config.holder]) {
      this.destroy(config.holder);
    }

    if (this.readyMap[config.holder]) {
      this.readyMap[config.holder].next(false);
    } else {
      this.readyMap[config.holder] = new BehaviorSubject<boolean>(false);
    }
    if (this.changeMap[config.holder]) {
      this.changeMap[config.holder].next(0);
    } else {
      this.changeMap[config.holder] = new BehaviorSubject<number>(0);
    }
    if (this.blocksMap[config.holder]) {
      this.blocksMap[config.holder].next([]);
    } else {
      this.blocksMap[config.holder] = new BehaviorSubject<Block[]>([]);
    }

    const options: EditorConfig = {
      ...this.config.editorjs,
      ...config,
      tools: this.plugins.getTools(includeTools)
    };
    this.editorFactory.instances
      .pipe(
        filter(i => {
          return i && i.holder === this.config.editorjs.holder;
        })
      )
      .subscribe(e => {
        console.log(e);
      });

    const editor = await this.editorFactory.createInstance({
      ...options,
      onReady: () => {
        this.readyMap[config.holder].next(true);
      },
      onChange: () => {
        this.changeMap[config.holder].next(Date.now());
        if (autoSave) this.save(config.holder);
      }
    });
    if (!editor) {
      return;
    }
    console.log(editor);
    this.editorMap[config.holder].next(editor);
    return editor;
    // return editor.then(e => {
    //   console.log('ready');
    //   this.editorMap[config.holder] = e;
    // });
  }

  /**
   * Get an `EditorJS` instance, if the instance does not exist it will be created
   * and returned with the default settings
   * See the [EditorJS API](https://editorjs.io/api) docs for more details
   * @param holder The ID of the holder of the instance
   */
  public getEditor(holder: string): Observable<EditorJS> {
    if (!this.editorMap[holder]) {
      this.editorMap[holder] = new BehaviorSubject<EditorJS>(undefined);
    }

    return this.editorMap[holder].pipe(filter(editor => typeof editor !== undefined));
  }

  /**
   * Get an observable of the blocks for an `EditorJS` instance
   * If there is no instance of that name it will throw an error.
   * @param holder The ID of the holder of the instance
   */
  public getBlocks(holder: string): Observable<Block[]> {
    if (!this.blocksMap[holder]) {
      this.blocksMap[holder] = new BehaviorSubject<Block[]>([]);
    }
    return this.blocksMap[holder].asObservable();
  }

  /**
   * Returns an `Observable<boolean>` of the current ready state, this can be subscribed to before calling
   * the `createEditor` method
   * @param holder
   */
  public isReady(holder: string): Observable<boolean> {
    if (!this.readyMap[holder]) {
      this.readyMap[holder] = new BehaviorSubject<boolean>(false);
    }
    return this.readyMap[holder].asObservable();
  }

  /**
   * Returns an `Observable<number>` of the current timestamp of the last change
   * this can be subscribed to before calling the `createEditor` method
   * @param holder
   */
  public hasChanged(holder: string): Observable<number> {
    if (!this.changeMap[holder]) {
      this.changeMap[holder] = new BehaviorSubject<number>(0);
    }
    return this.changeMap[holder].asObservable();
  }

  /**
   * This method updates the blocks within the `EditorJS` instance.
   * If there is no instance of that name it will throw an error.
   * @param holder The ID of the holder of the instance
   * @param blocks The array of `Block` elements to render
   */
  public update(holder: string, blocks: Block[]) {
    const updateDone$ = new Subject<boolean>();
    combineLatest([this.isReady(holder), this.getEditor(holder)])
      .pipe(
        takeUntil(updateDone$),
        filter(([ready, editor]) => typeof editor !== 'undefined')
      )
      .subscribe(([ready, editor]) => {
        if (!ready || !editor) {
          return;
        }
        if (ready && editor) {
          (editor as any).blocks.clear();
          (editor as any).blocks.render({
            blocks,
            time: Date.now(),
            version: EditorJS.version
          });
          //this.blocksMap[holder].next(blocks);
          this.changeMap[holder].next(Date.now());
          updateDone$.next(true);
          updateDone$.complete();
        }
      });
  }

  /**
   * Calls the `EditorJS` save method which returns an `OutputData` object.
   * From this the service updates the blocks map and change map values
   * If there is no instance of that name it will throw an error.
   * @param holder The ID of the holder of the instance
   */
  public async save(holder: string): Promise<void> {
    if (!this.editorMap[holder]) {
      console.debug(`Save: No EditorJS instance for ${holder}`);
      return;
    }
    this.editorMap[holder].subscribe(async editor => {
      const outputData = await editor.saver.save();
      this.blocksMap[holder].next(outputData.blocks);
      this.changeMap[holder].next(outputData.time);
    });
  }

  /**
   * Destroy the `EditorJS` instance
   * It also calls the maps and sets their values back to their defaults and then
   * completes and destroys them
   * @param holder The ID of the holder of the instance
   */
  public destroy(holder: string): void {
    // Clean up the maps
    // [['blocksMap', []], ['changeMap', 0], ['readyMap', false]].forEach(([mapKay, value]: [string, any]) => {
    //   if (this[mapKay][holder]) {
    //     this[mapKay][holder].next(value);
    //     this[mapKay][holder].complete();
    //     this[mapKay][holder] = null;
    //     delete this[mapKay][holder];
    //   }
    // });
    // this.zone.run(() => {
    //   if (this.editorMap[holder]) {
    //     this.editorMap[holder].destroy();
    //     this.editorMap[holder] = null;
    //     delete this.editorMap[holder];
    //   }
    // });
  }
}
