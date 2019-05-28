import { InjectionToken } from '@angular/core';
import { ToolSettings, ToolConstructable } from '@editorjs/editorjs';

export interface BlockData {
  [key: string]: any;
}

export enum PluginTypes {
  Block = 'block',
  Inline = 'inline'
}

/**
 * The types of plugins supported via the plugin `type` property
 */
export type PluginType = 'block' | 'inline' | string;

/**
 * A plugin property
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
   * Optional block data, used to define the block data for this type
   * and used as a default
   */
   blockData?: BlockData;
  /**
   * The plugin settings to be returned, for dependency injection this should be
   * a function that returns the plugin class
   */
  plugin: () => EditorJSPlugin;
}

// /**
//  * A Module plugin configuration
//  */
// export interface PluginConfig {
//   /**
//    * The key of the plugin and the plugin class extending `BasePlugin`
//    */
//   [key: string]: PluginClass;
// }

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
 * Interface for the injected EditorJS class, returns the static
 * class of EditorJS with the version and that creates the instance and provides
 * the Typescript parse with type information
 */
export interface PluginClass<T = NgxEditorJSPlugin> extends Function {
  /**
   * Constructor
   */
  new (...args: any[]): T;
}

export interface PluginConfig {
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
   * Optional block data, used to define the block data for this type
   * and used as a default
   */
   blockData?: BlockData;

   plugin: EditorJSPlugin;
}

/**
 * The Injection token for initial plugins as defined in the ngx-editorjs module
 */
export const EDITOR_JS_TOOL_INJECTOR = new InjectionToken<EditorJSPlugin>('EDITOR_JS_TOOL_INJECTOR');

export const PLUGIN_CONFIG = new InjectionToken<PluginConfig>('PLUGIN_CONFIG');

export function createPluginConfig(pluginConfigs: PluginConfig[], plugins: EditorJSPlugin[]) {
  const result =  Object.entries(pluginConfigs).reduce((pluginConfig, [index, config]) => {
    console.log(config)
    return {...pluginConfig, [config.key]: {...config, plugin: plugins[index]}}
  }, {});
  console.log(result);
  return result;
}

/**
 * The injection token for adding plugins via your own application
 */
export const UserPlugins = new InjectionToken<PluginConfig>('UserPlugins');

export interface PluginClassesMap {
  [key: string]: PluginConfig
}

export const PluginClasses = new InjectionToken<PluginClassesMap>('PluginClasses');
