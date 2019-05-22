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
export const MAP_DEFAULTS = [['hasChangedMap', { time: 0, blocks: [] }], ['isReadyMap', false], ['hasSavedMap', false]];

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

/**
 * Options to pass when calling the `EditorJS` instance API
 */
export interface InjectorApiCallOptions {
  /**
   * Holder for the `EditorJS` instance
   */
  holder: string;

  /**
   * The method to call
   */
  method: string;
  /**
   * The optional namespace for the API call
   */
  namespace?: string;
}

/**
 * A response from the `EditorJS` api
 */
export interface InjectorApiCallResponse<T = any> extends InjectorApiCallOptions {
  result: T;
}
