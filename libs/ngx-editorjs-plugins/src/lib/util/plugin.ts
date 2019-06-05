import { EditorJSPlugin, PluginConfig } from '../types/plugins';

/**
 * Factory function to create the plugin config map for the plugin service
 * @param pluginConfigs The array of plugin configuration objects passed to this factory
 * @param plugins The array of `EditorJS` plugins that are passed to this factory
 */
export function createPluginConfig(pluginConfigs: PluginConfig[], plugins: EditorJSPlugin[]) {
  return pluginConfigs.reduce(
    (pluginConfig, config, index) => ({ ...pluginConfig, [config.key]: { ...config, plugin: plugins[index] } }),
    {}
  );
}
