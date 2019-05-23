import { Injectable } from '@angular/core';
import Code from '@editorjs/code';
import { ToolSettings } from '@editorjs/editorjs';
import { BasePlugin } from '../../types/plugins';

/**
 * This plugin returns the tool settings for a `<code>` block tool for EditorJS
 */
@Injectable()
export class PluginCode implements BasePlugin {
  /**
   * Returns the `ToolSettings` for this plugin
   */
  public plugin(): ToolSettings {
    return Code;
  }
}
