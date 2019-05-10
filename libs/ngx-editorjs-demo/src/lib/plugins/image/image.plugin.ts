import { Injectable } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';
import Image from '@editorjs/image';
import { EditorJSPlugin } from '@tinynodes/ngx-editorjs';

@Injectable()
export class PluginImage extends EditorJSPlugin {
  static plugin(): ToolSettings {
    return Image;
  }
}
