import { Injectable } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';
import SimpleImage from '@editorjs/simple-image';
import { BasePlugin } from '@tinynodes/ngx-editorjs';

@Injectable()
export class PluginSimpleImage implements BasePlugin {
  plugin(): ToolSettings {
    return SimpleImage;
  }
}
