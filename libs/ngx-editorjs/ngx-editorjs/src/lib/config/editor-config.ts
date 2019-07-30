import { EditorConfig } from '@editorjs/editorjs';

/**
 * The default holder ID to attach EditorJS to
 */
export const DEFAULT_HOLDER_ID = 'editor-js';

/**
 * Creates an EditorJS configuration, only returning keys that are set
 * @param inputConfig Optional config to use to set values
 */
export function createEditorJSConfig(inputConfig?: EditorConfig): EditorConfig {
  if (!inputConfig) {
    return {
      holder: DEFAULT_HOLDER_ID
    };
  }
  const editorJsConfig: EditorConfig = {};
  Object.entries(inputConfig).forEach(([key, val]) => {
    editorJsConfig[key] = val;
  });
  return {
    holder: inputConfig.holder || DEFAULT_HOLDER_ID,
    ...editorJsConfig
  };
}
