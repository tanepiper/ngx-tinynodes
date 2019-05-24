import { Injectable } from '@angular/core';
import Paragraph from '@editorjs/paragraph';
import { EditorJSPlugin, NgxEditorJSPlugin } from '../../types/plugins';

/**
 * This plugin returns the tool settings for a `<p>` block tool for EditorJS
 */
@Injectable()
export class PluginParagraph implements NgxEditorJSPlugin {
  /**
   * The plugin type
   */
  static type = 'block';

  /**
   * The plugin key
   */
  static key = 'paragraph';

  /**
   * The plugin Name
   */
  static pluginName = 'Paragraph Block';

  /**
   * The plugin description
   */
  static description = 'Provides a &lt;p> block for EditorJS';
  /**
   * Returns the required class for the plugin
   */
  public plugin(): EditorJSPlugin {
    return Paragraph;
  }
}
