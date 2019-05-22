import { InjectionToken } from '@angular/core';
import EditorJS, { EditorConfig } from '@editorjs/editorjs';
import { Block } from './blocks';
/**
 * Configuration for creating an EditorJS instance
 */
export interface EditorJSInstanceConfig {
  /**
   * The editor configuration, this is required with at least the `holder` property
   */
  editorConfig: EditorConfig;
  /**
   * The method to call when the editor makes a change
   */
  onChange?: (holder?: string) => void;

  /**
   * The method to call with an editor is ready
   */
  onReady?: (holder?: string) => void;
}

/**
 * Default values for each internal map
 */
export const MAP_DEFAULTS = [['hasChangedMap', { time: 0, blocks: [] }], ['isReadyMap', false]];

/**
 * Injection token for the EditorJS class
 */
export const EDITORJS_MODULE_IMPORT = new InjectionToken<any>('EDITORJS_MODULE_IMPORT');

export const EditorJSInstance = new InjectionToken<any>('EditorJSInstance');

/**
 * Options for a Injector method
 */
export interface InjectorMethodOption {
  /**
   * The holder for the option
   */
  holder: string;
  /**
   * Optional blocks
   */
  blocks?: Block[];
  /**
   * Optional editor
   */
  editor?: EditorJS;
}
