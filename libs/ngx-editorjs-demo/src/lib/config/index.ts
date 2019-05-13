import { PluginConfig } from '@tinynodes/ngx-editorjs';
import {
  PluginCode,
  PluginHeader,
  PluginLink,
  PluginList,
  PluginMarker,
  PluginParagraph,
  PluginSimpleImage
} from '@tinynodes/ngx-editorjs-plugins';

/**
 * Creates the tools for the `ngx-tinynodes` demo application
 */
export function createNgxEditorJSDemoTools(): PluginConfig {
  return {
    parargraph: new PluginParagraph(),
    header: new PluginHeader(),
    list: new PluginList(),
    code: new PluginCode(),
    image: new PluginSimpleImage(),
    link: new PluginLink(),
    marker: new PluginMarker()
  };
}
