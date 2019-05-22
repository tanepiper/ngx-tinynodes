import { EditorConfig } from '@editorjs/editorjs';
/**
 * Interface describing an action to trigger EditorJS
 */
export interface EditorJSAction<T = any> {
  /**
   * The name of the action to trigger
   */
  action: string;

  /**
   * The payload for the action <T>
   */
  payload?: T;
}

/**
 * Supported actions by the API
 */
export enum EditorJSActionTypes {
  /**
   * Create a new editor
   */
  CreateEditor = 'createEditor',

  /**
   * Update an editor instance
   */
  UpdateEditor = 'updateEditor',
  /**
   * Clear a editor instance
   */
  ClearEditor = 'clearEditor',
  /**
   * Destroy an Editor instance
   */
  DestroyEditor = 'destroyEditor',
  /**
   * Save the blocks in an editor instance
   */
  SaveEditor = 'saveEditor'
}

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
  includeTools?: string[];
  /**
   * Autosave on change, is set to false
   */
  autoSave?: number;
}
