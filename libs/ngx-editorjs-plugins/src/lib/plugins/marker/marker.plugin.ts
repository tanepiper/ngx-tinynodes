import { Injectable } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';
import Marker from '@editorjs/marker';
import { BasePlugin } from '../../types/plugins';

/**
 * This plugin returns the tool settings for a inline marker tool for `EditorJS`
 */
@Injectable()
export class PluginMarker implements BasePlugin {
  /**
   * Returns the plugin settings
   */
  public plugin(): ToolSettings {
    return Marker;
  }
  /**
   * Returns the plugin shortcut
   */
  public shortcut() {
    return 'CMD+SHIFT+M';
  }
}
