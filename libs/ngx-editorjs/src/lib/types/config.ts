import { InjectionToken } from '@angular/core';
import EditorJS, { OutputData, SanitizerConfig } from '@editorjs/editorjs';

/**
 * Configuration for the EditorJS instance
 */
export interface EditorJSConfig {
  /**
   * If the EditorJS is autofocused on creation (default: false)
   */
  autofocus?: boolean;

  /**
   * Any initial output data to render
   */
  data?: OutputData;

  /**
   * If true, toolbar won't be shown
   */
  hideToolbar?: boolean;

  /**
   * ID of the element to hold the config
   */
  holder?: string;

  /**
   * The name of the initial block (default "paragraph")
   */
  initialBlock?: string;

  /**
   * Height of Editor's bottom area that allows to set focus on the last Block
   */
  minHeight?: number;

  /**
   * First Block placeholder
   */
  placeholder?: string;

  /**
   * Define default sanitizer configuration
   */
  sanitizer?: SanitizerConfig;
}

/**
 * The configuration option that can be passed to the `NgxEditorJSModule.forRoot` method
 */
export interface NgxEditorJSConfig {
  /**
   * Configuration options for `EditorJS`
   */
  editorjs?: EditorJSConfig;
}

/**
 * Injection token provied for `NgxEditorJSConfig`
 */
export const NGX_EDITORJS_CONFIG = new InjectionToken<NgxEditorJSConfig>('NGX_EDITORJS_CONFIG');

/**
 * Internal token for injecting the `NgxEditorJSConfig` into the config factory
 */
export const FOR_ROOT_OPTIONS_TOKEN = new InjectionToken<NgxEditorJSConfig>('FOR_ROOT_OPTIONS_TOKEN');

/**
 * Get the EditorJS instance injected into the app
 */
export const EDITIOR_JS_INSTANCE = new InjectionToken<EditorJS>('EDITIOR_JS_INSTANCE');
