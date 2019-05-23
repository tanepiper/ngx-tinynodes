import EditorJS, { OutputData } from '@editorjs/editorjs';
import { BehaviorSubject } from 'rxjs';
import { Block } from './blocks';

/**
 * A map containing instances of `BehaviorSubject<EditorJS>`
 */
export interface EditorMap {
  /**
   * A map key containing `BehaviorSubject<EditorJS>`
   */
  [key: string]: BehaviorSubject<EditorJS>;
}

/**
 * A map containing `BehaviorSubject<boolean>` values of the ready state of EditorJS
 */
export interface ReadyMap {
  /**
   * A map key containing a `BehaviorSubject<boolean>`
   */
  [key: string]: BehaviorSubject<boolean>;
}

/**
 * A map containing `BehaviorSubject<boolean>` values of the save state of EditorJS
 */
export interface SavedMap {
  /**
   * A map key containing a `BehaviorSubject<boolean>`
   */
  [key: string]: BehaviorSubject<boolean>;
}

/**
 * An EditorJS change event
 */
export interface EditorJSChange {
  /**
   * Time of the change
   */
  time: number;
  /**
   * Blocks in the change
   */
  blocks: Block[];
}

/**
 * A map containing `BehaviorSubject<OutputData>` which is the last save from the EditorJS instance
 */
export interface ChangeMap {
  /**
   * A map key containing a `BehaviorSubject<OutputData>`
   */
  [key: string]: BehaviorSubject<OutputData>;
}
