import EditorJS, { OutputData } from '@editorjs/editorjs';
import { BehaviorSubject } from 'rxjs';
import { Block } from './blocks';

/**
 * A map containing instances of `EditorJS`
 */
export interface EditorMap {
  /**
   * A map key containing a {BehaviorSubject} of {EditorJS}
   */
  [key: string]: BehaviorSubject<EditorJS>;
}

/**
 * A map containing `BehaviorSubject` of `Block` elements from `EditorJS`
 */
export interface BlocksMap {
  /**
   * A map key containing a {BehaviorSubject} of {Block[]}
   */
  [key: string]: BehaviorSubject<Block[]>;
}

/**
 * A map containing `BehaviorSubject` of `boolean` values of the ready state of `EditorJS`
 */
export interface ReadyMap {
  /**
   * A map key containing a {BehaviorSubject} of {boolean}
   */
  [key: string]: BehaviorSubject<boolean>;
}

/**
 * A map containing `BehaviorSubject` of `boolean` values of the save state of `EditorJS`
 */
export interface SavedMap {
  /**
   * A map key containing a {BehaviorSubject} of {boolean}
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
 * A map containing `BehaviorSubject` of `number` which is the timestamp of the last `EditorJS` change
 */
export interface ChangeMap {
  /**
   * A map key containing a {BehaviorSubject} of {number}
   */
  [key: string]: BehaviorSubject<OutputData>;
}
