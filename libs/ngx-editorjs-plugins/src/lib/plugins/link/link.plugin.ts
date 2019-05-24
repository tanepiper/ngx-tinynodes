import { Injectable } from '@angular/core';
import Link from '@editorjs/link';
import { EditorJSPlugin, NgxEditorJSPlugin } from '../../types/plugins';

/**
 * This plugin returns the tool settings for a `<a>` block tool for EditorJS
 */
@Injectable()
export class PluginLink implements NgxEditorJSPlugin {
  /**
   * The plugin type
   */
  static type = 'block';

  /**
   * The plugin key
   */
  static key = 'link';

  /**
   * The plugin Name
   */
  static pluginName = 'Link Block';

  /**
   * The plugin description
   */
  static description = 'Provides an &lt;a> block';
  /**
   * Returns the required class for the plugin
   */
  public plugin(): EditorJSPlugin {
    return Link;
  }
}
