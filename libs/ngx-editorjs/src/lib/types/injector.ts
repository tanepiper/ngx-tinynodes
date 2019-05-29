import { InjectionToken } from '@angular/core';
import EditorJS, { EditorConfig, OutputData } from '@editorjs/editorjs';
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
export const MAP_DEFAULTS = [['lastChangeMap', { time: 0, blocks: [], version: EditorJS.version}], ['isReadyMap', false], ['hasSavedMap', false]];

/**
 * Injection token for the EditorJS class
 */
export const EDITORJS_MODULE_IMPORT = new InjectionToken<any>('EDITORJS_MODULE_IMPORT');

/**
 * The EditorJS class injector
 */
export const EditorJSInstance = new InjectionToken<EditorJSClass>('EditorJSInstance');

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
  data?: OutputData;
  /**
   * Optional editor
   */
  editor?: EditorJS;
}

/**
 * Options to pass when calling the EditorJS instance API
 */
export interface InjectorApiCallOptions {
  /**
   * Holder for the EditorJS instance
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
 * A response from the EditorJS api
 */
export interface InjectorApiCallResponse<T = any> extends InjectorApiCallOptions {
  result: T;
}

/**
 * Interface for the injected EditorJS class, returns the static
 * class of EditorJS with the version and that creates the instance and provides
 * the Typescript parse with type information
 */
export interface EditorJSClass<T = EditorJS> extends Function {
  new (...args: any[]): T;
  /**
   * EditorJS version
   */
  version: string;
}
