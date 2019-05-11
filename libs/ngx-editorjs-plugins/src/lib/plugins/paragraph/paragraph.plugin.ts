import { Injectable } from '@angular/core';
import Paragraph from '@editorjs/paragraph';
import { ToolSettings } from '@editorjs/editorjs';
import { BasePlugin } from '../../types/plugins';

/**
 * This plugin returns the tool settings for a `<p>` block tool for `EditorJS`
 */
@Injectable()
export class PluginParagraph implements BasePlugin {
  /**
   * Returns the plugin settings
   */
  public plugin(): ToolSettings {
    return Paragraph;
  }
}
