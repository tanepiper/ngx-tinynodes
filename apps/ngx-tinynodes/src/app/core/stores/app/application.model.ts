import { Block } from '@tinynodes/ngx-editorjs';
import { MenuGroup } from '../../types/app';

/**
 * An Enum of the keys in the application state
 */
export enum ApplicationStateKeys {
  /**
   * The hidden state key
   */
  Hidden = 'hidden',

  /**
   * The menus key
   */
  Menus = 'menus',

  /**
   * The demo data key
   */
  DemoData = 'demoData'
}

/**
 * Interface for a demo data object
 */
export interface DemoData<T = any> {
  /**
   * The name of the demo (e.g. `ngx-editorjs-demo`)
   */
  name: string;
  /**
   * The data for the demo as `<T>`
   */
  data: T;
}

/**
 * Interface for `ngx-editorjs-demo` data
 * TODO: This should be moved
 */
export interface NgxEditorJSDemo {
  /**
   * The initial blocks for the demo
   */
  blocks: Block[];
}

/**
 * The demo data for `ngx-editorjs-demo`
 */
export interface NgxEditorJSDemoData extends DemoData<NgxEditorJSDemo> {}

/**
 * The demos on tinynodes
 */
export interface TinynodeDemos {
  /**
   * The `ngx-editorjs-demo` data
   */
  'ngx-editorjs-demo': NgxEditorJSDemoData;
}

/**
 * A representation of the application state
 */
export interface ApplicationState {
  /**
   * If the side menu is hidden
   */
  hidden: boolean;

  /**
   * A set of menus loaded from application data
   */
  menus: MenuGroup[];

  /**
   * Data for demos
   */
  demoData: DemoData[];
}
