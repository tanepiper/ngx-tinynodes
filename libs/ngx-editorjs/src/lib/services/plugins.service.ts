import { Injectable, Inject, Optional } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';
import { InitialPlugins, PluginConfig, UserPlugins } from '../types/plugins';

@Injectable()
export class PluginService {
  private pluginsMap = new Map<string, ToolSettings>();

  constructor(
    @Inject(InitialPlugins) initialPlugins: PluginConfig,
    @Optional() @Inject(UserPlugins) userPlugins: PluginConfig
  ) {
    Object.entries({ ...initialPlugins, ...userPlugins }).forEach(([key, tool]) => {
      this.pluginsMap.set(key, tool);
    });
  }

  public add(name: string, tool: ToolSettings) {
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
