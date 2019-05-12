import { Injectable } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';
import List from '@editorjs/list';
import { BasePlugin } from '../../types/plugins';

/**
 * This plugin returns the tool settings for a `<li>` and `<ol>` block tool for `EditorJS`
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
