import { Injectable } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';
import Marker from '@editorjs/marker';
import { NgxEditorJSPlugin, EditorJSPlugin } from '../../types/plugins';

/**
 * This plugin returns the tool settings for a inline marker tool for EditorJS
 */
@Injectable()
export class PluginMarker implements NgxEditorJSPlugin {
  /**
   * The plugin type
   */
  static type = 'inline';

  /**
   * The plugin key
   */
  static key = 'marker';

  /**
   * The plugin Name
   */
  static pluginName = 'Inline Marker';

  /**
   * The plugin description
   */
  static description = 'Provides an inline highlight marker for EditorJS';
  /**
   * The Plugin shortcut
   */
  static shortcut = 'CMD+SHIFT+M';
  /**
   * Returns the required class for the plugin
   */
  public plugin(): EditorJSPlugin {
    return Marker;
  }
}
