import { Inject, Injectable, NgZone } from '@angular/core';
import EditorJS, { EditorConfig } from '@editorjs/editorjs';
import { BehaviorSubject, Observable, combineLatest, Subject } from 'rxjs';
import { Block } from '../types/blocks';
import { EditorJSConfig, NgxEditorJSConfig, NGX_EDITORJS_CONFIG } from '../types/config';
import { BlocksMap, ChangeMap, EditorMap, ReadyMap } from '../types/maps';
import { EditorJSInstanceService } from '../utils/editorjs-injector';
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
  constructor(
    @Inject(NGX_EDITORJS_CONFIG) private config: NgxEditorJSConfig,
    private readonly editorFactory: EditorJSInstanceService,
    private readonly plugins: NgxEditorJSPluginService,
    private zone: NgZone
  ) {}

  /**
   * This method creates a new EditorJS instance and adds it to the editor map.
   * @param holder The ID of the holder of the instance
   * @param blocks Optional initial set of blocks to render in the editor
   * @param excludeTools String array of keys to not include with this editor
   * @param autoSave When an instance changes we update the block map, set to false if you want to disable
   */
  public async createEditor(config: EditorJSConfig, includeTools?: string[], autoSave = false): Promise<void> {
    const options: EditorConfig = {
      ...this.config.editorjs,
      ...config,
      tools: this.plugins.getTools(includeTools)
    };

    await this.editorFactory.createInstance(options);
  }

  /**
   * Get an `EditorJS` instance, if the instance does not exist it will be created
   * and returned with the default settings
   * See the [EditorJS API](https://editorjs.io/api) docs for more details
   * @param holder The ID of the holder of the instance
   */
  public getEditor(holder: string): Observable<EditorJS> {
    return this.editorFactory.getInstance(holder).pipe(filter(editor => typeof editor !== 'undefined'));
  }

  /**
   * Get an observable of the blocks for an `EditorJS` instance
   * If there is no instance of that name it will throw an error.
   * @param holder The ID of the holder of the instance
   */
  public getBlocks(holder: string): Observable<Block[]> {
    return this.editorFactory.getBlocks[holder];
  }

  /**
   * Returns an `Observable<boolean>` of the current ready state, this can be subscribed to before calling
   * the `createEditor` method
   * @param holder
   */
  public isReady(holder: string): Observable<boolean> {
    return this.editorFactory.getReady(holder);
  }

  /**
   * Returns an `Observable<number>` of the current timestamp of the last change
   * this can be subscribed to before calling the `createEditor` method
   * @param holder
   */
  public hasChanged(holder: string): Observable<number> {
    return this.editorFactory.getChanged(holder);
  }

  /**
   * This method updates the blocks within the `EditorJS` instance.
   * If there is no instance of that name it will throw an error.
   * @param holder The ID of the holder of the instance
   * @param blocks The array of `Block` elements to render
   */
  public update(holder: string, blocks: Block[]) {
    this.editorFactory.update(holder, blocks);
    // const updateDone$ = new Subject<boolean>();
    // combineLatest([this.isReady(holder), this.getEditor(holder)])
    //   .pipe(
    //     takeUntil(updateDone$),
    //     filter(([ready, editor]) => ready && typeof editor !== 'undefined')
    //   )
    //   .subscribe(([ready, editor]) => {
    //     if (!ready || !editor) {
    //       return;
    //     }
    //     if (ready && editor) {
    //       (editor as any).render({
    //         blocks,
    //         time: Date.now(),
    //         version: EditorJS.version
    //       });

    //       updateDone$.next(true);
    //       updateDone$.complete();
    //     }
    //   });
  }

  /**
   * Calls the `EditorJS` save method which returns an `OutputData` object.
   * From this the service updates the blocks map and change map values
   * If there is no instance of that name it will throw an error.
   * @param holder The ID of the holder of the instance
   */
  public save(holder: string): void {
    this.editorFactory.save(holder);
  }

  /**
   * Clears all blocks from an `EditorJS instance`
   * @param holder The ID of the holder of the instance
   */
  public clear(holder: string): void {
    this.editorFactory.clear(holder);
  }

  /**
   * Destroy the `EditorJS` instance
   * It also calls the maps and sets their values back to their defaults and then
   * completes and destroys them
   * @param holder The ID of the holder of the instance
   */
  public destroy(holder: string): void {
    this.editorFactory.destroyInstance(holder);
  }
}
