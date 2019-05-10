import { Injectable } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';
import Marker from '@editorjs/marker';
import { EditorJSPlugin } from '@tinynodes/ngx-editorjs';

@Injectable()
export class PluginMarker extends EditorJSPlugin {
  static plugin(): ToolSettings {
    return {
      class: Marker,
      shortcut: 'CMD+SHIFT+M'
    };
  }
}
