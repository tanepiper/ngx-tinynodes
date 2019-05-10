import { Injectable } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';
import Marker from '@editorjs/marker';
import { BasePlugin } from '@tinynodes/ngx-editorjs';

@Injectable()
export class PluginMarker implements BasePlugin {
  plugin(): ToolSettings {
    return Marker;
  }

  shortcut() {
    return 'CMD+SHIFT+M';
  }
}
