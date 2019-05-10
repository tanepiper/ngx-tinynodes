import { Inject, Injectable, NgZone } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { Block } from '../types/blocks';
import {
  EditorJSConfig,
  NgxEditorJSTools,
  NGX_EDITORJS_TOOLS,
  NGX_EDITORJS_CONFIG,
  NgxEditorJSConfig
} from '../types/config';
import { PluginService } from './plugins.service';

/**
 * The NgxEditorJSService provides control over an editor instance
 * within a page, provided by the directive
 */
@Injectable()
export class NgxEditorJSService {
  /**
   * Editor instance
   */
  private editorInstance: EditorJS;

  /**
   * A subject containing the current blocks
   */
  private blocks$ = new BehaviorSubject<Block[]>([]);

  constructor(
    @Inject(NGX_EDITORJS_CONFIG) private config: NgxEditorJSConfig,
    private readonly plugins: PluginService,
    private zone: NgZone
  ) {}

  /**
   * This method initialised the EditorJS instance
   * @param holder
   * @param config
   * @param blocks
   */
  public init(holder: string, blocks: Block[]) {
    this.zone.run(() => {
      const options: EditorJSConfig = {
        holder,

        tools: this.plugins.plugins,
        data: {
          blocks,
          time: Date.now(),
          version: EditorJS.version
        },
        ...this.config.editorjs
      };
      this.editorInstance = new EditorJS(options as any);
    });
  }

  /**
   * This method updates the blocks within the EditorJS instance
   * @param blocks
   */
  public update(blocks: Block[]) {
    this.zone.run(() => {
      this.editorInstance.blocks.clear();
      this.editorInstance.blocks.render({
        blocks,
        time: Date.now(),
        version: EditorJS.version
      });
    });
  }

  /**
   * This methods gets the block data from the output data and updates
   * the service subject
   */
  public save(): void {
    this.zone.run(async () => {
      const outputData = await this.editorInstance.saver.save();
      this.blocks$.next(outputData.blocks);
    });
  }

  /**
   * Get an observable of the blocks for this EditorJS instance
   */
  public get blocks(): Observable<Block[]> {
    return this.blocks$.asObservable();
  }

  /**
   * Get the EditorJS instance
   * See the [EditorJS API](https://editorjs.io/api) docs for more details
   */
  public get editor(): EditorJS {
    return this.editorInstance;
  }

  /**
   * Destroy the EditorJS instance
   */
  public destroy(): void {
    this.zone.run(async () => {
      if (this.editorInstance) {
        this.editorInstance.destroy();
      }
    });
  }
}
