import { Injectable } from '@angular/core';
import Header from '@editorjs/header';
import { Tool } from '@editorjs/editorjs';
import { EditorJSPlugin } from '../../types/plugins';

@Injectable()
export class PluginHeader extends EditorJSPlugin {
  static plugin(): Tool {
    return Header;
  }
}
