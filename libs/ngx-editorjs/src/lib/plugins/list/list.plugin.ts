import { Injectable } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';
import List from '@editorjs/list';
import { BasePlugin } from '../../types/plugins';

@Injectable()
export class PluginList implements BasePlugin {
  public plugin(): ToolSettings {
    return List;
  }
}
