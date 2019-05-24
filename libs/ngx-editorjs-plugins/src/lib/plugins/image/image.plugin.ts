import { Injectable } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';
import Image from '@editorjs/image';
import { NgxEditorJSPlugin, EditorJSPlugin } from '../../types/plugins';

/**
 * This plugin returns the tool settings for a `<h1> - <h6>` block tool for EditorJS
 */
@Injectable()
export class PluginImage implements NgxEditorJSPlugin {
  /**
   * The plugin type
   */
  static type = 'block';

  /**
   * The plugin key
   */
  static key = 'image';

  /**
   * The plugin Name
   */
  static pluginName = 'Image Block';

  /**
   * The plugin description
   */
  static description = 'Provides an &lt;img> block with upload feature';
  /**
   * Returns the required class for the plugin
   */
  public plugin(): EditorJSPlugin {
    return Image;
  }
}
