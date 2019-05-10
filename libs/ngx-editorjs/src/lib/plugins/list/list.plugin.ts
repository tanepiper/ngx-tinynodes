import { Injectable } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';
import List from '@editorjs/list';
import { EditorJSPlugin } from '../../types/plugins';

@Injectable()
export class PluginList extends EditorJSPlugin {
  static plugin(): ToolSettings {
    return List;
  }
}
