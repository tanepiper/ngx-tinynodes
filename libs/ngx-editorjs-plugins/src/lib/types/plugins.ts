import { InjectionToken } from '@angular/core';
import { ToolSettings, ToolConstructable } from '@editorjs/editorjs';

/**
 * Block Data interface
 */
export interface BlockData {
  [key: string]: any;
}

/**
 * The types of plugins supported, currently block and inline
 */
export enum PluginTypes {
  /**
   * A EditorJS block plugin
   */
  Block = 'block',
  /**
   * A EditorJS inline plugin
   */
  Inline = 'inline'
}

/**
 * The types of plugins supported via the plugin `type` property
 */
export type PluginType = PluginTypes.Block | PluginTypes.Inline | string;

/**
 * A plugin property
 */
export type PluginProperty = string;

/**
 * The EditorJS tool settings for this plugin
 */
export type EditorJSPlugin = ToolConstructable | ToolSettings;

/**
 * A map of all the tools settings
 */
export interface ToolSettingsMap {
  /**
   * The key of the plugin and the plugin exported tool settings
   */
  [key: string]: EditorJSPlugin;
}

/**
 * A plugin configuration object
 */
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
  /**
   * The plugin for the editor
   */
  plugin: EditorJSPlugin | undefined;
}

/**
 * The Injection token for initial plugins as defined in the ngx-editorjs module
 */
export const EDITOR_JS_TOOL_INJECTOR = new InjectionToken<EditorJSPlugin>('EDITOR_JS_TOOL_INJECTOR');

/**
 * Injection token for a plugin config
 */
export const PLUGIN_CONFIG = new InjectionToken<PluginConfig>('PLUGIN_CONFIG');

/**
 * A map of plugin configs
 */
export interface PluginConfigMap {
  /**
   * A plugin config per key
   */
  [key: string]: PluginConfig;
}

/**
 * Injection token for the plugin config map
 */
export const PluginClasses = new InjectionToken<PluginConfigMap>('PluginClasses');
