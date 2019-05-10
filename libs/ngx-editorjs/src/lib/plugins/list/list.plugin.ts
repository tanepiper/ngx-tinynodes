import { Injectable } from '@angular/core';
import { Tool } from '@editorjs/editorjs';
import List from '@editorjs/list';
import { EditorJSPlugin } from '../../types/plugins';

@Injectable()
export class PluginList extends EditorJSPlugin {
  static plugin(): Tool {
    return List;
  }
}
