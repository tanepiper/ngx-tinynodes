import { Injectable } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';
import List from '@editorjs/list';
import { BasePlugin } from '../../types/plugins';

/**
 * Plugin class to return the EditorJS plugin
 */
@Injectable()
export class PluginList implements BasePlugin {
  /**
   * Returns the plugin settings
   */
  public plugin(): ToolSettings {
    return List;
  }
}
