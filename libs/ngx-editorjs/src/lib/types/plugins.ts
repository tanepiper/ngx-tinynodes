import { InjectionToken } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';

export interface PluginConfig {
  [key: string]: ToolSettings;
}

export class EditorJSPlugin {
  static plugin(): ToolSettings {
    throw new Error('You must implement this method in your own class');
  }
}

export const InitialPlugins = new InjectionToken<PluginConfig>('InitialPlugins');
export const UserPlugins = new InjectionToken<PluginConfig>('UserPlugins');
