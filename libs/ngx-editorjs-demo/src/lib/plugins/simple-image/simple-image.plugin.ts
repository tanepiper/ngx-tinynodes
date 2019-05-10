import { Injectable } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';
import SimpleImage from '@editorjs/simple-image';
import { EditorJSPlugin } from '@tinynodes/ngx-editorjs';

@Injectable()
export class PluginSimpleImage extends EditorJSPlugin {
  static plugin(): ToolSettings {
    return SimpleImage;
  }
}
