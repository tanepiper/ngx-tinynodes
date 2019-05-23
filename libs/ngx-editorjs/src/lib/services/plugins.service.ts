import { Inject, Injectable } from '@angular/core';
import { BasePlugin, PluginConfig, ToolSettingsMap, UserPlugins } from '../types/plugins';

/**
 * The plugin service provides a singleton to store all plugins injected into the application
 * and makes them available for all instances of EditorJS
 */
@Injectable({
  providedIn: 'root'
})
export class NgxEditorJSPluginService {
  /**
   * Object map of the plugin configurations
   */
  private pluginsMap: PluginConfig = {};

  /**
   * When the class is initialized the initial plugins and any user plugins
   * will be passed in and merged and stored in the config map
   * @param userPlugins User plugins injected into the application
   */
  constructor(@Inject(UserPlugins) userPlugins: PluginConfig) {
    Object.entries({ ...userPlugins }).forEach(([key, tool]) => this.add(key, tool));
  }

  /**
   * Add a plugin to the store
   * @param key The key for the map to store the plugin
   * @param plugin The plugin instance to add to the service
   */
  public add(key: string, plugin: BasePlugin) {
    this.pluginsMap[key] = plugin;
  }

  /**
   * Remove a plugin from the store
   * @param key
   */
  public remove(key: string) {
    this.pluginsMap[key] = null;
    delete this.pluginsMap[key];
  }

  /**
   * Get a single plugin from the map
   * @param name
   */
  public get(key: string): BasePlugin {
    return this.pluginsMap[key];
  }

  /**
   * Returns a map of all the plugins registered with this service
   */
  public get plugins(): PluginConfig {
    return this.pluginsMap;
  }

  /**
   * Returns a map of tools to be initialized by the editor
   * @param exclude Optional array of keys to exclude from the map
   */
  public getTools(exclude: string[] = []): ToolSettingsMap {
    return Object.entries(this.pluginsMap)
      .filter(([key]) => {
        return !exclude.includes(key);
      })
      .reduce((finalTools, [key, plugin]) => {
        if (plugin.shortcut) {
          return {
            [key]: {
              class: plugin.plugin(),
              shortcut: plugin.shortcut()
            },
            ...finalTools
          };
        } else {
          return { [key]: plugin.plugin(), ...finalTools };
        }
      }, {});
  }
}
