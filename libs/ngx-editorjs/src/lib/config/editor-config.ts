import { EditorConfig } from '@editorjs/editorjs';

/**
 * The default holder ID to attach `EditorJS` to
 */
export const DEFAULT_HOLDER_ID = 'editor-js';

/**
 * Creates an EditorJS config
 * @param inputConfig The config to merge
 */
export function createEditorJSConfig(inputConfig?: EditorConfig): EditorConfig {
  if (!inputConfig) {
    return {
      holder: DEFAULT_HOLDER_ID
    };
  }
  const editorJsConfig: EditorConfig = {};
  if (inputConfig.autofocus) {
    editorJsConfig.autofocus = inputConfig.autofocus;
  }
  if (inputConfig.data) {
    editorJsConfig.data = inputConfig.data;
  }
  if (inputConfig.hideToolbar) {
    editorJsConfig.hideToolbar = inputConfig.hideToolbar;
  }
  if (inputConfig.initialBlock) {
    editorJsConfig.initialBlock = inputConfig.initialBlock;
  }
  if (inputConfig.minHeight) {
    editorJsConfig.minHeight = inputConfig.minHeight;
  }
  if (inputConfig.placeholder) {
    editorJsConfig.placeholder = inputConfig.placeholder;
  }
  if (inputConfig.sanitizer) {
    editorJsConfig.sanitizer = inputConfig.sanitizer;
  }
  return {
    holder: inputConfig.holder || DEFAULT_HOLDER_ID,
    ...editorJsConfig
  };
}
