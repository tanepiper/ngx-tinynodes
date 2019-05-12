import { Injectable } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import { BasePlugin } from '../../types/plugins';

/**
 * This plugin returns the tool settings for a `<h1> - <h6>` block tool for `EditorJS`
 */
@Injectable()
export class PluginHeader implements BasePlugin {
  /**
   * Returns the plugin settings
   */
  public plugin(): ToolSettings {
    return Header;
  }
}
