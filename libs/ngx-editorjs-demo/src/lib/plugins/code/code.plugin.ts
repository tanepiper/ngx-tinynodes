import { Injectable } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';
import Code from '@editorjs/code';
import { BasePlugin } from '@tinynodes/ngx-editorjs';

@Injectable()
export class PluginCode implements BasePlugin {
  plugin(): ToolSettings {
    return Code;
  }
}
