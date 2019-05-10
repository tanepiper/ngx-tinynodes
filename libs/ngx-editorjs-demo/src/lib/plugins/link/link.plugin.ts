import { Injectable } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';
import Link from '@editorjs/link';
import { EditorJSPlugin } from '@tinynodes/ngx-editorjs';

@Injectable()
export class PluginLink extends EditorJSPlugin {
  static plugin(): ToolSettings {
    return Link;
  }
}
