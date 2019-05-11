import { Inject, Injectable, NgZone } from '@angular/core';
import EditorJS, { EditorConfig } from '@editorjs/editorjs';
import { NgxEditorJSPluginService } from '@tinynodes/ngx-editorjs-plugins';
import { BehaviorSubject, Observable } from 'rxjs';
import { Block } from '../types/blocks';
import { NgxEditorJSConfig, NGX_EDITORJS_CONFIG } from '../types/config';
import { BlocksMap, ChangeMap, EditorMap, ReadyMap } from '../types/maps';

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
  public createEditor(holder: string, blocks?: Block[], excludeTools?: string[], autoSave = true): void {
    if (this.editorMap[holder]) {
      this.destroy(holder);
    }

    if (this.readyMap[holder]) {
      this.readyMap[holder].next(false);
    } else {
      this.readyMap[holder] = new BehaviorSubject<boolean>(false);
    }
    if (this.changeMap[holder]) {
      this.changeMap[holder].next(0);
    } else {
      this.changeMap[holder] = new BehaviorSubject<number>(0);
    }

    this.zone.run(() => {
      const options: EditorConfig = {
        ...this.config.editorjs,
        holder,
        tools: this.plugins.getTools(excludeTools)
      };
      if (blocks) {
        options.data = {
          blocks,
          time: Date.now(),
          version: EditorJS.version
        };
      }
      this.editorMap[holder] = new EditorJS({
        ...options,
        onReady: () => {
          this.readyMap[holder].next(true);
        },
        onChange: () => {
          this.changeMap[holder].next(Date.now());
          if (autoSave) this.save(holder);
        }
      });
    });
  }

  /**
   * Get an `EditorJS` instance, if the instance does not exist it will be created
   * and returned with the default settings
   * See the [EditorJS API](https://editorjs.io/api) docs for more details
   * @param holder The ID of the holder of the instance
   */
  public getEditor(holder: string): EditorJS {
    if (!this.editorMap[holder]) {
      this.createEditor(holder);
    }
    return this.editorMap[holder];
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
    if (!this.editorMap[holder]) {
      throw new Error(`No EditorJS instance for ${holder}`);
    }
    this.zone.run(() => {
      this.editorMap[holder].blocks.clear();
      this.editorMap[holder].blocks.render({
        blocks,
        time: Date.now(),
        version: EditorJS.version
      });
    });
  }

  /**
   * Calls the `EditorJS` save method which returns an `OutputData` object.
   * From this the service updates the blocks map and change map values
   * If there is no instance of that name it will throw an error.
   * @param holder The ID of the holder of the instance
   */
  public save(holder: string): void {
    if (!this.editorMap[holder]) {
      throw new Error(`No EditorJS instance for ${holder}`);
    }
    this.zone.run(async () => {
      const outputData = await this.editorMap[holder].saver.save();
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
    [['blocksMap', []], ['changeMap', 0], ['readyMap', false]].forEach(([mapKay, value]: [string, any]) => {
      if (this[mapKay][holder]) {
        this[mapKay][holder].next(value);
        this[mapKay][holder].complete();
        this[mapKay][holder] = null;
        delete this[mapKay][holder];
      }
    });
    this.zone.run(() => {
      if (this.editorMap[holder]) {
        this.editorMap[holder].destroy();
        this.editorMap[holder] = null;
        delete this.editorMap[holder];
      }
    });
  }
}
