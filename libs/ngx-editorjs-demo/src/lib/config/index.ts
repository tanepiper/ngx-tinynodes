import { PluginCode } from '../plugins/code/code.plugin';
import { PluginConfig } from '@tinynodes/ngx-editorjs';
import { PluginSimpleImage } from '../plugins/simple-image/simple-image.plugin';
import { PluginLink } from '../plugins/link/link.plugin';
import { PluginMarker } from '../plugins/marker/marker.plugin';

export function createTools(): PluginConfig {
  return {
    code: new PluginCode(),
    image: new PluginSimpleImage(),
    link: new PluginLink(),
    marker: new PluginMarker()
  };
}
