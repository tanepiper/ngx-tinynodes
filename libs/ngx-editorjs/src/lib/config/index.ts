import { PluginConfig } from '../types/plugins';
import { PluginHeader } from '../plugins/header/header.plugin';
import { PluginList } from '../plugins/list/list.plugin';

export function defaultConfig() {
  return {
    editorjs: { autofocus: false, holder: 'editor-js', initialBlock: 'paragraph' }
  };
}

export function createTools(): PluginConfig {
  return { header: PluginHeader.plugin(), list: PluginList.plugin() };
}
