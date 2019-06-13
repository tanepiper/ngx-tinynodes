import { Inject, Injectable } from '@angular/core';
import { PluginClasses, PluginConfig, PluginConfigMap, ToolSettingsMap } from '../types/plugins';

/**
 * The `NgxEditorJSPluginService` is provided as a root service for handling {@link https://github.com/editor-js | EditorJS plugins}.
 *
 * Plugins are provided by using {@link https://angular.io/api/core/NgModule | NgModule} to inject the plugin with a
 * {@link ../interfaces/PluginConfig.html | PluginConfig} using providers.
 */
@Injectable({
  providedIn: 'root'
})
export class NgxEditorJSPluginService {
  /**
   * @param pluginConfigMap The plugin configuration map injected into the application
   */
  constructor(@Inject(PluginClasses) private readonly pluginConfigMap: PluginConfigMap) {}

  /**
   * Get a map of all plugin configurations
   * @returns The map of plugins injected into this plugin
   */
  public getPlugins(): PluginConfigMap {
    return this.pluginConfigMap;
  }

  /**
   * Get a plugin configuration via it's key
   * @param key The key of the plugin to get
   * @returns The plugin configuration for the passed key
   */
  public getPlugin(key: string): PluginConfig {
    return this.pluginConfigMap[key];
  }

  /**
   * Get a list of plugins, filtering with an exclude list of plugins
   * @param excludeList
   */
  public getPluginsWithExclude(excludeList: string[] = []): PluginConfigMap {
    return Object.entries(this.pluginConfigMap)
      .filter(([key]) => {
        return !excludeList.includes(key);
      })
      .reduce((pluginMap, [key, plugin]) => {
        return { ...pluginMap, [key]: plugin };
      }, {});
  }

  /**
   * Get a list of plugins, filtering with an include list of plugins
   * @param includeList
   */
  public getPluginsWithInclude(includeList: string[] = []): PluginConfigMap {
    return Object.entries(this.pluginConfigMap)
      .filter(([key]) => {
        return includeList.includes(key);
      })
      .reduce((pluginMap, [key, plugin]) => {
        return { ...pluginMap, [key]: plugin };
      }, {});
  }

  /**
   * Returns a map of {@link https://editorjs.io/api | EditorJS} tools to be initialized by the editor
   * @param excludeTools Optional array of tools to exclude, if not passed all tools
   */
  public getTools(excludeTools: string[] = []): ToolSettingsMap {
    return Object.entries(this.getPluginsWithExclude(excludeTools)).reduce(
      (finalTools, [key, plugin]: [string, PluginConfig]) => {
        const tool: any = {
          class: plugin.plugin
        };
        if (plugin.shortcut) tool.shortcut = plugin.shortcut;
        if (plugin.type === 'inline' || plugin.inlineToolbar) tool.inlineToolbar = true;
        if (plugin.config) tool.config = plugin.config;
        return { ...finalTools, [key]: tool };
      },
      {}
    );
  }
}
