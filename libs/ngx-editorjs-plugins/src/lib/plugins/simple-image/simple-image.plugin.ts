import { Injectable } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';
import SimpleImage from '@editorjs/simple-image';
import { BasePlugin } from '../../types/plugins';

/**
 * This plugin returns the simple image tool for `<img>` block editor EditorJS
 */
@Injectable()
export class PluginSimpleImage implements BasePlugin {
  /**
   * Returns the plugin settings
   */
  public plugin(): ToolSettings {
    return SimpleImage;
  }
}
