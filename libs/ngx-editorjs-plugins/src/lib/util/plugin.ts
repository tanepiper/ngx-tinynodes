import { EditorJSPlugin, PluginConfig } from '../types/plugins';

/**
 * Factory function to create the plugin config map for the plugin service
 * @param pluginConfigs
 * @param plugins
 */
export function createPluginConfig(pluginConfigs: PluginConfig[], plugins: EditorJSPlugin[]) {
  return pluginConfigs.reduce(
    (pluginConfig, config, index) => ({ ...pluginConfig, [config.key]: { ...config, plugin: plugins[index] } }),
    {}
  );
}