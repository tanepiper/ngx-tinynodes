import {
  BaseToolConstructable,
  BlockToolConstructable,
  InlineToolConstructable,
  ToolSettings,
  OutputData
} from '@editorjs/editorjs';
import { InjectionToken } from '@angular/core';

export type ConfigToolInstance =
  | BaseToolConstructable
  | BlockToolConstructable
  | InlineToolConstructable
  | ToolSettings
  | any;

export interface ToolConfig {
  [key: string]: ConfigToolInstance;
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
   * A map of tools and their options
   */
  tools?: ToolConfig;

  /**
   * Any initial output data to render
   */
  data?: OutputData;
}

export interface NgxEditorJSConfig {
  editorjs: EditorJSConfig;
}

export const NGX_EDITORJS_CONFIG = new InjectionToken('NGX_EDITORJS_CONFIG');

export const HEADER_TOOL = new InjectionToken<ConfigToolInstance>('HEADER_TOOL');
export const LIST_TOOL = new InjectionToken<ConfigToolInstance>('LIST_TOOL');
