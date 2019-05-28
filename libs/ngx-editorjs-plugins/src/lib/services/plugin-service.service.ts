import { Inject, Injectable } from '@angular/core';
import { PluginClasses, PluginClassesMap } from '../types/plugins';

/**
 * The NgxEditorJSPluginService provides a global service for plugins, injected via
 * modules
 */
@Injectable({
  providedIn: 'root'
})
export class NgxEditorJSPluginService {

  private readonly allPlugins: PluginClassesMap = {};

  constructor(@Inject(PluginClasses) private readonly pluginClasses: PluginClassesMap) {
    this.allPlugins = { ...this.allPlugins, ...pluginClasses };
  }

  getPlugins() {
    return this.pluginClasses;
  }

  getPlugin(key: string) {
    return this.pluginClasses[key];
  }
}
