import { Block } from '@tinynodes/ngx-editorjs';
import { MenuGroup } from '../../types/app';

export enum ApplicationStateKeys {
  Hidden = 'hidden',
  Menus = 'menus',
  DemoData = 'demoData'
}

export interface DemoData<T = any> {
  name: string;
  data: T;
}

export interface NgxEditorJSDemo {
  blocks: Block[];
}

export interface NgxEditorJSDemoData extends DemoData<NgxEditorJSDemo> {}

export interface TinynodeDemos {
  'ngx-editorjs': NgxEditorJSDemoData;
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
