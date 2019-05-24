import { Injectable } from '@angular/core';
import Header from '@editorjs/header';
import { EditorJSPlugin, NgxEditorJSPlugin } from '../../types/plugins';

/**
 * This plugin returns the tool settings for a `<h1> - <h6>` block tool for EditorJS
 */
@Injectable()
export class PluginHeader implements NgxEditorJSPlugin {
  /**
   * The plugin type
   */
  static type = 'block';

  /**
   * The plugin key
   */
  static key = 'header';

  /**
   * The plugin Name
   */
  static pluginName = 'Header Block';

  /**
   * The plugin description
   */
  static description = 'Provides &lt;h1> - &lt;h6> header blocks';
  /**
   * Returns the required class for the plugin
   */
  public plugin(): EditorJSPlugin {
    return Header;
  }
}
