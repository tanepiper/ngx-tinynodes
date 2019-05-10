import { Tool } from '@editorjs/editorjs';
import { InjectionToken } from '@angular/core';

export interface PluginConfig {
  [key: string]: Tool;
}

export class EditorJSPlugin {
  static plugin(): Tool {
    throw new Error('You must implement this method in your own class');
  }
}

export const InitialPlugins = new InjectionToken<PluginConfig>('InitialPlugins');
export const UserPlugins = new InjectionToken<PluginConfig>('UserPlugins');
