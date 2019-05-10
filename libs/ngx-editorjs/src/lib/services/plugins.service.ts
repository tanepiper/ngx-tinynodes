import { Injectable, Inject, Optional } from '@angular/core';
import { Tool } from '@editorjs/editorjs';
import { InitialPlugins, PluginConfig, UserPlugins } from '../types/plugins';

@Injectable({ providedIn: 'root' })
export class PluginService {
  private pluginsMap = new Map<string, Tool>();

  constructor(
    @Inject(InitialPlugins) initialPlugins: PluginConfig,
    @Optional() @Inject(UserPlugins) userPlugins: PluginConfig
  ) {
    Object.entries({ ...initialPlugins, ...userPlugins }).forEach(([key, tool]) => {
      this.pluginsMap.set(key, tool);
    });
  }

  public add(name: string, tool: Tool) {
    this.pluginsMap.set(name, tool);
  }

  public remove(name: string) {
    this.pluginsMap.delete(name);
  }

  public get(name: string) {
    this.pluginsMap.get(name);
  }

  public get plugins(): PluginConfig {
    let plugins = {};
    for (let [k, v] of this.pluginsMap) {
      plugins[k] = v;
    }
    return plugins;
  }

  public toJSON() {
    return JSON.stringify(this.plugins);
  }
}
