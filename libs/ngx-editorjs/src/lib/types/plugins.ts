import { InjectionToken } from '@angular/core';
import { ToolSettings } from '@editorjs/editorjs';

export interface PluginConfig {
  [key: string]: BasePlugin;
}

export interface BasePlugin {
  plugin: () => ToolSettings;
  shortcut?: () => string;
}

export const InitialPlugins = new InjectionToken<PluginConfig>('InitialPlugins');
export const UserPlugins = new InjectionToken<PluginConfig>('UserPlugins');
