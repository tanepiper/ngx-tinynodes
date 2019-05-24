import { Injectable } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';
import List from '@editorjs/list';
import { NgxEditorJSPlugin, EditorJSPlugin } from '../../types/plugins';

/**
 * This plugin returns the tool settings for a `<li>` and `<ol>` block tool for EditorJS
 */
@Injectable()
export class PluginList implements NgxEditorJSPlugin {
  /**
   * The plugin type
   */
  static type = 'block';

  /**
   * The plugin key
   */
  static key = 'list';

  /**
   * The plugin Name
   */
  static pluginName = 'List Block';

  /**
   * The plugin description
   */
  static description = 'Provides list blocks for &lt;ol> and &lt;li> lists';
  /**
   * Returns the required class for the plugin
   */
  public plugin(): EditorJSPlugin {
    return List;
  }
}
