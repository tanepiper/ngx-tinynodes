import { EditorConfig } from '@editorjs/editorjs';

/**
 * EditorJS options
 */
export interface CreateEditorJSOptions {
  /**
   * Configuration
   */
  config: EditorConfig;
  /**
   * Tools to include, Optional - if not set all tools will be used
   */
  excludeTools?: string[];
  /**
   * Autosave on change, is set to false
   */
  autoSave?: number;
}
