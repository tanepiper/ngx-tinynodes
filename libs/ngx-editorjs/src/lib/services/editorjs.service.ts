import { Inject, Injectable, NgZone } from '@angular/core';
import EditorJS, { EditorConfig } from '@editorjs/editorjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { Block } from '../types/blocks';
import { NgxEditorJSConfig, NGX_EDITORJS_CONFIG } from '../types/config';
import { PluginService } from './plugins.service';

/**
 * The NgxEditorJSService provides control over an editor instance within an application
 */
@Injectable({
  providedIn: 'root'
})
export class NgxEditorJSService {
  private editorMap = new Map<string, EditorJS>();
  private blocksMap = new Map<string, BehaviorSubject<Block[]>>();

  constructor(
    @Inject(NGX_EDITORJS_CONFIG) private config: NgxEditorJSConfig,
    private readonly plugins: PluginService,
    private zone: NgZone
  ) {}

  /**
   * This method creates an editor instance and adds it to a map of
   * instances using the holder as the key
   * @param holder The ID of the holder of the instance
   * @param blocks Optional initial set of blocks to render in the editor
   * @param exclude String array of keys to not include with this editor
   */
  public createEditor(holder: string, blocks?: Block[], excludeTools?: string[]) {
    if (this.editorMap.has(holder)) {
      this.destroy(holder);
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
      this.editorMap.set(holder, new EditorJS(options));
    });
  }

  /**
   * Get the EditorJS instance
   * See the [EditorJS API](https://editorjs.io/api) docs for more details
   * @param holder The ID of the holder of the instance
   */
  public getEditor(holder: string): EditorJS | undefined {
    return this.editorMap.get(holder);
  }

  /**
   * This method updates the blocks within the EditorJS instance
   * @param holder The ID of the holder of the instance
   * @param blocks The array of blocks to render
   */
  public update(holder: string, blocks: Block[]) {
    this.zone.run(() => {
      this.editorMap.get(holder).blocks.clear();
      this.editorMap.get(holder).blocks.render({
        blocks,
        time: Date.now(),
        version: EditorJS.version
      });
    });
  }

  /**
   * This methods gets the block data from the output data and updates
   * the service subject
   * @param holder The ID of the holder of the instance
   */
  public save(holder: string): void {
    this.zone.run(async () => {
      const outputData = await this.editorMap.get(holder).saver.save();
      this.blocksMap.get(holder).next(outputData.blocks);
    });
  }

  /**
   * Get an observable of the blocks for this EditorJS instance
   * @param holder The ID of the holder of the instance
   */
  public blocks(holder: string): Observable<Block[]> {
    return this.blocksMap.get(holder).asObservable();
  }

  /**
   * Destroy the EditorJS instance
   * @param holder The ID of the holder of the instance
   */
  public destroy(holder: string): void {
    this.zone.run(() => {
      if (this.editorMap.has(holder)) {
        this.editorMap.get(holder).destroy();
      }
    });
    this.editorMap.delete(holder);
  }
}
