import { Injectable } from '@angular/core';
import { Tool } from '@editorjs/editorjs';
import Code from '@editorjs/code';
import { EditorJSPlugin } from '@tinynodes/ngx-editorjs';

@Injectable()
export class PluginCode extends EditorJSPlugin {
  static plugin(): Tool {
    return Code;
  }
}
