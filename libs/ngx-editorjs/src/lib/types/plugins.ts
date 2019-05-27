import { InjectionToken } from '@angular/core';
import { ToolSettings, ToolConstructable } from '@editorjs/editorjs';

/**
 * The types of plugins supported via the plugin `type` property
 */
export type PluginType = 'block' | 'inline' | string;

/**
 * A Plugin Property, this is a string but can also be passed methods that return strings
 * for dynamic generation, this method is passed the original string
 */
export type PluginProperty = string;

/**
 * The EditorJS tool settings for this plugin
 */
export type EditorJSPlugin = ToolConstructable | ToolSettings;

/**
 * Defines the interface for required and optional plugin methods.
 * These methods allow a plugin to return a EditorJS plugin and an optional shortcut
 */
export interface NgxEditorJSPlugin {
  /**
   * Specifies the type of plugin for the plugin provider
   */
  readonly type: PluginProperty;
  /**
   * The key to use for the plugin
   */
  readonly key: PluginProperty;
  /**
   * Label for displaying the plugin name
   */
  readonly name: PluginProperty;

  /**
   * Optional description for the plugin
   */
  readonly description?: PluginProperty;
  /**
   * Optional shortcut for the plugin
   */
  readonly shortcut?: PluginProperty;
  /**
   * The plugin settings to be returned, for dependency injection this should be
   * a function that returns the plugin class
   */
  plugin: () => EditorJSPlugin;
}

/**
 * A Module plugin configuration
 */
export interface PluginMap {
  /**
   * The key of the plugin and the plugin class extending `BasePlugin`
   */
  [key: string]: PluginClass;
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
 * Interface for plugin defaults take from a plugin class
 */
export interface PluginDefaults {
  /**
   * Specifies the type of plugin for the plugin provider
   */
  type: string;
  /**
   * The default key to use for the plugin
   */
  key: string;
  /**
   * Label for displaying the plugin name
   */
  pluginName: string;
  /**
   * Optional description for the plugin
   */
  description?: string;
  /**
   * Optional shortcut for the plugin
   */
  shortcut?: string;

  /**
   * The constructor for the plugin
   */
  constructor: PluginClass;
}

/**
 * Interface for the injected EditorJS class, returns the static
 * class of EditorJS with the version and that creates the instance and provides
 * the Typescript parse with type information
 */
export interface PluginClass<T = NgxEditorJSPlugin> extends Function {
  /**
   * Specifies the type of plugin for the plugin provider
   */
  type: PluginProperty;
  /**
   * The key to use for the plugin
   */
  key: PluginProperty;
  /**
   * Label for displaying the plugin name
   */
  pluginName: PluginProperty;

  /**
   * Optional description for the plugin
   */
  description?: PluginProperty;
  /**
   * Optional shortcut for the plugin
   */
  shortcut?: PluginProperty;
  /**
   * Constructor
   */
  new (...args: any[]): T;
}

/**
 * The Injection token for initial plugins as defined in the ngx-editorjs module
 */
export const InitialPlugins = new InjectionToken<PluginMap>('InitialPlugins');

/**
 * The injection token for adding plugins via your own application
 */
export const UserPlugins = new InjectionToken<PluginMap>('UserPlugins');
