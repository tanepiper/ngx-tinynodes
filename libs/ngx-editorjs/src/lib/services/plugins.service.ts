import { Inject, Injectable, Optional } from '@angular/core';
import { BasePlugin, InitialPlugins, PluginConfig, UserPlugins } from '../types/plugins';
import { NgxEditorJSTools } from '../types/config';

/**
 * The plugin service provides a singleton to store all plugins injected into the application
 * and makes them available for all instances of EditorJS
 */
@Injectable({
  providedIn: 'root'
})
export class PluginService {
  private pluginsMap: PluginConfig = {};

  /**
   * When the class is initialized the initial plugins and any user plugins
   * will be passed in and merged and stored in the config map
   * @param initialPlugins Default plugins produced by the module
   * @param userPlugins User plugins injected into the application
   */
  constructor(
    @Inject(InitialPlugins) initialPlugins: PluginConfig,
    @Optional() @Inject(UserPlugins) userPlugins: PluginConfig
  ) {
    Object.entries({ ...initialPlugins, ...userPlugins }).forEach(([key, tool]) => this.add(key, tool));
  }

  /**
   * Add a plugin to the store
   * @param name
   * @param tool
   */
  public add(name: string, tool: BasePlugin) {
    this.pluginsMap[name] = tool;
  }

  /**
   * Remove a plugin from the store
   * @param name
   */
  public remove(name: string) {
    this.pluginsMap[name] = null;
    delete this.pluginsMap[name];
  }

  /**
   * Get a single plugin from the map
   * @param name
   */
  public get(name: string) {
    this.pluginsMap[name];
  }

  /**
   * Get a map of all plugins
   */
  public get plugins(): PluginConfig {
    return this.pluginsMap;
  }

  /**
   * Get a tools instance
   */
  public getTools(exclude: string[] = []) {
    return Object.entries(this.pluginsMap)
      .filter(([key]) => {
        return !exclude.includes(key);
      })
      .reduce((finalTools, [key, plugin]) => {
        let p;
        if (plugin.shortcut) {
          p = {
            [key]: {
              class: plugin.plugin(),
              shortcut: plugin.shortcut()
            }
          };
        } else {
          p = { [key]: plugin.plugin() };
        }
        return { ...finalTools, ...p };
      }, {});
  }

  public toJSON() {
    return JSON.stringify(this.pluginsMap);
  }
}
