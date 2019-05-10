import { Injectable } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';
import Image from '@editorjs/image';
import { BasePlugin } from '@tinynodes/ngx-editorjs';

@Injectable()
export class PluginImage implements BasePlugin {
  plugin(): ToolSettings {
    return Image;
  }
}
