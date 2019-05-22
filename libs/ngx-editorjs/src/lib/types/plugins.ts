import { InjectionToken } from '@angular/core';
import { ToolConstructable, ToolSettings } from '@editorjs/editorjs';

/**
 * A Module plugin configuration
 */
export interface PluginConfig {
  /**
   * The key of the plugin and the plugin class extending `BasePlugin`
   */
  [key: string]: BasePlugin;
}

/**
 * A map of all the tools settings
 */
export interface ToolSettingsMap {
  /**
   * The key of the plugin and the plugin exported tool settings
   */
  [key: string]: ToolConstructable | ToolSettings;
}

/**
 * Defines the interface for required and optional plugin methods.
 * These methods allow a plugin to return a EditorJS plugin and an optional shortcut
 */
export interface BasePlugin {
  /**
   * The plugin settings to be returned
   */
  plugin: () => ToolConstructable | ToolSettings;

  /**
   * Optional shortcut for the plugin
   */
  shortcut?: () => string;
}

/**
 * The injection token for adding plugins via your own application
 */
export const UserPlugins = new InjectionToken<PluginConfig>('UserPlugins');
