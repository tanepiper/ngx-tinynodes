import { Inject, Injectable, InjectionToken, NgZone } from '@angular/core';
import { EditorConfig } from '@editorjs/editorjs';
import { BehaviorSubject } from 'rxjs';

/**
 * Injection token for the EditorJS class
 */
export const EDITORJS_MODULE_IMPORT = new InjectionToken<any>('EDITORJS_MODULE_IMPORT');

/**
 * EditorJS factory service, call `createInstance` with an `EditorConfig` to
 * return an instance after the DOM element is ready
 */
@Injectable({
  providedIn: 'root'
})
export class EditorJSFactory {
  constructor(@Inject(EDITORJS_MODULE_IMPORT) private editorFactory: any, private zone: NgZone) {}

  instances = new BehaviorSubject<any>(null);

  /**
   * Return a new EditorJS instance
   * @param config The Editor configuration to create
   */
  createInstance(config: EditorConfig) {
    let retVal: any;
    const editor = this.zone.runOutsideAngular(() => {
      const e = new (this.editorFactory as any)(config);
      return e.isReady.then(() => {
        this.instances.next({ holder: config.holder, editor: e });
        retVal = e;
        return e;
      });
    });
    if (!editor) {
      return;
    }
    //console.log(editor, retVal);
    //return editor.then(e => e);
    return editor.then(e => {
      return e;
      // const foo = {};
      // for (let key in Object.getOwnPropertyDescriptors(e.__proto__)) {
      //   console.log(key, e[key]);
      //   foo[key] = e[key];
      // }
      // console.log(foo);
      // return foo;
    });
    return Object.create(editor);
  }
}
