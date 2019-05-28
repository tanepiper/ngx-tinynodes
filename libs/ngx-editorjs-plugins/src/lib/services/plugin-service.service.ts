import { Inject, Injectable } from '@angular/core';
import { PluginClasses, PluginConfig, PluginConfigMap } from '../types/plugins';

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
  constructor(@Inject(PluginClasses) private readonly pluginConfigMap: PluginConfigMap) {
  }

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
}
