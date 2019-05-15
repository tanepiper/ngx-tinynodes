import { Inject, Injectable, NgZone } from '@angular/core';
import EditorJS, { EditorConfig } from '@editorjs/editorjs';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Block } from '../types/blocks';
import { EditorJSConfig, NgxEditorJSConfig, NGX_EDITORJS_CONFIG } from '../types/config';
import { EditorJSInstanceService } from '../utils/editorjs-injector';
import { NgxEditorJSPluginService } from './plugins.service';

/**
 * The NgxEditorJSService provides a service for an Angular application
 * to talk to an EditorJS instance
 */
@Injectable({
  providedIn: 'root'
})
export class NgxEditorJSService {
  constructor(
    @Inject(NGX_EDITORJS_CONFIG) private config: NgxEditorJSConfig,
    private readonly editorService: EditorJSInstanceService,
    private readonly plugins: NgxEditorJSPluginService
  ) {}

  /**
   * This method creates a new EditorJS instance
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

    await this.editorService.createInstance(options);
  }

  /**
   * Get an `EditorJS` instance
   * See the [EditorJS API](https://editorjs.io/api) docs for more details
   * @param holder The ID of the holder of the instance
   */
  public getEditor(holder: string): Observable<EditorJS> {
    return this.editorService.getInstance(holder).pipe(filter(editor => typeof editor !== 'undefined'));
  }

  /**
   * Get an observable of the blocks for an `EditorJS` instance
   * @param holder The ID of the holder of the instance
   */
  public getBlocks(holder: string): Observable<Block[]> {
    return this.editorService.getBlocks(holder);
  }

  /**
   * Returns an `Observable<boolean>` of the current ready state, this can be subscribed to before calling
   * the `createEditor` method
   * @param holder
   */
  public isReady(holder: string): Observable<boolean> {
    return this.editorService.getReady(holder);
  }

  /**
   * Returns an `Observable<number>` of the current timestamp of the last change
   * this can be subscribed to before calling the `createEditor` method
   * @param holder
   */
  public hasChanged(holder: string): Observable<number> {
    return this.editorService.getChanged(holder);
  }

  /**
   * This method updates the blocks within the `EditorJS` instance.
   * If there is no instance of that name it will throw an error.
   * @param holder The ID of the holder of the instance
   * @param blocks The array of `Block` elements to render
   */
  public update(holder: string, blocks: Block[]) {
    this.editorService.update(holder, blocks);
  }

  /**
   * Calls the `EditorJS` save method which returns an `OutputData` object.
   * From this the service updates the blocks map and change map values
   * If there is no instance of that name it will throw an error.
   * @param holder The ID of the holder of the instance
   */
  public save(holder: string): void {
    this.editorService.save(holder);
  }

  /**
   * Clears all blocks from an `EditorJS instance`
   * @param holder The ID of the holder of the instance
   */
  public clear(holder: string): void {
    this.editorService.clear(holder);
  }

  /**
   * Destroy the `EditorJS` instance
   * It also calls the maps and sets their values back to their defaults and then
   * completes and destroys them
   * @param holder The ID of the holder of the instance
   */
  public destroy(holder: string): void {
    this.editorService.destroyInstance(holder);
  }
}
