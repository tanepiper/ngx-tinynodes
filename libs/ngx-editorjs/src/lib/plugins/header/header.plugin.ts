import { Injectable } from '@angular/core';
import Header from '@editorjs/header';
import { ToolSettings } from '@editorjs/editorjs';
import { EditorJSPlugin } from '../../types/plugins';

@Injectable()
export class PluginHeader extends EditorJSPlugin {
  static plugin(): ToolSettings {
    return Header;
  }
}
