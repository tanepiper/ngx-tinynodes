import { PluginCode } from '../plugins/code/code.plugin';
import { PluginConfig } from '@tinynodes/ngx-editorjs';

export function createTools(): PluginConfig {
  return { code: PluginCode.plugin() };
}
