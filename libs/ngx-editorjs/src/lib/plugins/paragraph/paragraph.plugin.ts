import { Injectable } from '@angular/core';
import Paragraph from '@editorjs/paragraph';
import { ToolSettings } from '@editorjs/editorjs';
import { BasePlugin } from '../../types/plugins';

/**
 * Plugin class to return the EditorJS plugin
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
