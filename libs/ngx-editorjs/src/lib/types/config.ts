import { InjectionToken } from '@angular/core';
import { OutputData, ToolSettings } from '@editorjs/editorjs';

export interface NgxEditorJSTools {
  [key: string]: ToolSettings;
}

/**
 * Configuration for the EditorJS instance
 */
export interface EditorJSConfig {
  /**
   * ID of the element to hold the config
   */
  holder?: string;
  /**
   * If the EditorJS is autofocused on creation (default: false)
   */
  autofocus?: boolean;

  /**
   * The name of the initial block (default "paragraph")
   */
  initialBlock?: string;

  /**
   * Any initial output data to render
   */
  data?: OutputData;

  tools?: NgxEditorJSTools;
}

export interface NgxEditorJSConfig {
  editorjs?: EditorJSConfig;
}

export const NGX_EDITORJS_CONFIG = new InjectionToken<NgxEditorJSConfig>('NGX_EDITORJS_CONFIG');
