import { Injectable } from '@angular/core';
import SimpleImage from '@editorjs/simple-image';
import { EditorJSPlugin, NgxEditorJSPlugin } from '../../types/plugins';

/**
 * This plugin returns the simple image tool for `<img>` block editor EditorJS
 */
@Injectable()
export class PluginSimpleImage implements NgxEditorJSPlugin {
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
  static pluginName = 'Simple Image Block';

  /**
   * The plugin description
   */
  static description = 'Provides a &lt;img> block for EditorJS with image paste and URL functionality';
  /**
   * Returns the required class for the plugin
   */
  /**
   * Returns the plugin settings
   */
  public plugin(): EditorJSPlugin {
    return SimpleImage;
  }
}
