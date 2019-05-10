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
export const NGX_EDITORJS_TOOLS = new InjectionToken<NgxEditorJSTools>('NGX_EDITORJS_TOOLS');

export const HEADER_TOOL = new InjectionToken<ToolSettings>('HEADER_TOOL');
export const LIST_TOOL = new InjectionToken<ToolSettings>('LIST_TOOL');
