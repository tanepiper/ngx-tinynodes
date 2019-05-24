import {
  PluginCode,
  PluginHeader,
  PluginLink,
  PluginList,
  PluginMarker,
  PluginParagraph,
  PluginSimpleImage,
  PluginConfig
} from '@tinynodes/ngx-editorjs-plugins';

/**
 * Creates the tools for the `ngx-tinynodes` demo application
 */
export function createNgxEditorJSDemoTools(): PluginConfig {
  return {
    [PluginParagraph.key]: PluginParagraph,
    [PluginHeader.key]: PluginHeader,
    [PluginList.key]: PluginList,
    [PluginCode.key]: PluginCode,
    [PluginSimpleImage.key]: PluginSimpleImage,
    [PluginLink.key]: PluginLink,
    [PluginMarker.key]: PluginMarker
  };
}
