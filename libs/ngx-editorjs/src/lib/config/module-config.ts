import { NgxEditorJSModuleConfig } from '../types/config';
import { createEditorJSConfig } from './editor-config';

/**
 * Creates the configuration from the module config
 * @param config Optional module configurations
 */
export function createModuleConfig(config?: NgxEditorJSModuleConfig): NgxEditorJSModuleConfig {
  if (!config || !config.editorjs) {
    return {
      editorjs: createEditorJSConfig()
    };
  }
  return {
    editorjs: createEditorJSConfig(config.editorjs)
  };
}
