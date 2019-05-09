import { Injectable, NgZone } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import { Block } from '../types/blocks';
import { EditorJSConfig } from '../types/config';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NgxEditorJSService {
  private editorInstance: EditorJS;

  private blocks$ = new BehaviorSubject<Block[]>([]);

  constructor(private zone: NgZone) {}

  public init(holder: string, config: EditorJSConfig, blocks: Block[]) {
    this.zone.run(() => {
      const options: EditorJSConfig = {
        holder,
        ...config,
        data: {
          blocks,
          time: Date.now(),
          version: EditorJS.version
        }
      };
      this.editorInstance = new EditorJS(options);
    });
  }

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

  public save(): void {
    this.zone.run(async () => {
      const outputData = await this.editorInstance.saver.save();
      this.blocks$.next(outputData.blocks);
    });
  }

  public get editor(): EditorJS {
    return this.editorInstance;
  }

  public destroy(): void {
    this.editorInstance.destroy();
  }
}
