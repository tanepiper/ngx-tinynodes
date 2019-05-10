import { Injectable } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';
import Link from '@editorjs/link';
import { BasePlugin } from '@tinynodes/ngx-editorjs';

@Injectable()
export class PluginLink implements BasePlugin {
  plugin(): ToolSettings {
    return Link;
  }
}
