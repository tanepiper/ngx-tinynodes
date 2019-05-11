import { Injectable } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';
import Link from '@editorjs/link';
import { BasePlugin } from '@tinynodes/ngx-editorjs';

/**
 * This plugin returns the tool settings for a `<a>` block tool for `EditorJS`
 */
@Injectable()
export class PluginLink implements BasePlugin {
  /**
   * Returns the plugin settings
   */
  public plugin(): ToolSettings {
    return Link;
  }
}
