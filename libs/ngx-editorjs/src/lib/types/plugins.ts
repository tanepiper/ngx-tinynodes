import { InjectionToken } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';

/**
 * A map of tool keys to their plugin file, a plugin should implement BasePlugin
 */
export interface PluginConfig {
  [key: string]: BasePlugin;
}

/**
 * A map of took keys to ToolSettings
 */
export interface ToolSettingsMap {
  [key: string]: ToolSettings;
}

/**
 * Defines the interface for required and optional plugin methods.
 * These methods allow a plugin to return a EditorJS plugin and an optional shortcut
 */
export interface BasePlugin {
  /**
   * The plugin settings to be returned
   */
  plugin: () => ToolSettings;

  /**
   * Optional shortcut for the plugin
   */
  shortcut?: () => string;
}

export const InitialPlugins = new InjectionToken<PluginConfig>('InitialPlugins');
export const UserPlugins = new InjectionToken<PluginConfig>('UserPlugins');
