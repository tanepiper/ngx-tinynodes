import EditorJS from '@editorjs/editorjs';
import { BehaviorSubject } from 'rxjs';
import { Block } from './blocks';

/**
 * A map containing instances of `EditorJS`
 */
export interface EditorMap {
  [key: string]: BehaviorSubject<EditorJS>;
}

/**
 * A map containing `BehaviorSubject` of `Block` elements from `EditorJS`
 */
export interface BlocksMap {
  [key: string]: BehaviorSubject<Block[]>;
}

/**
 * A map containing `BehaviorSubject` of `boolean` values of the ready state of `EditorJS`
 */
export interface ReadyMap {
  [key: string]: BehaviorSubject<boolean>;
}

/**
 * A map containing `BehaviorSubject` of `number` which is the timestamp of the last `EditorJS` change
 */
export interface ChangeMap {
  [key: string]: BehaviorSubject<number>;
}
