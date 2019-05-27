import { Injectable } from '@angular/core';
import Code from '@editorjs/code';
import { EditorJSPlugin, NgxEditorJSPlugin } from '../../types/plugins';

export interface CodeBlockData {
  code: string;
}

/**
 * This plugin returns the tool settings for a `<code>` block tool for EditorJS
 */
@Injectable()
export class PluginCode implements NgxEditorJSPlugin {
  /**
   * The plugin type
   */
  static type = 'block';

  /**
   * The plugin key
   */
  static key = 'code';

  /**
   * The plugin Name
   */
  static pluginName = 'Code Block';

  /**
   * The plugin description
   */
  static description = 'Provides a &lt;code> block for EditorJS';

  /**
   * The default block data
   */
  static blockData = {
    code: ''
  };

  /**
   * Returns the required class for the plugin
   */
  public plugin(): EditorJSPlugin {
    return Code;
  }
}
