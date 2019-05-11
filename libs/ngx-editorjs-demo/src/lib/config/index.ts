import { PluginConfig } from '@tinynodes/ngx-editorjs';
import { PluginCode, PluginLink, PluginMarker, PluginSimpleImage } from '@tinynodes/ngx-editorjs-plugins';

/**
 * Creates the tools for the `ngx-tinynodes` demo application
 */
export function createNgxEditorJSDemoTools(): PluginConfig {
  return {
    code: new PluginCode(),
    image: new PluginSimpleImage(),
    link: new PluginLink(),
    marker: new PluginMarker()
  };
}
