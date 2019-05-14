import { Injectable, InjectionToken, Inject } from '@angular/core';
import EditorJS, { EditorConfig } from '@editorjs/editorjs';

export const EDITORJS_IMPORT_CONFIG = new InjectionToken<EditorConfig>('EDITORJS_IMPORT_CONFIG');

export const EDITORJS_MODULE_IMPORT = new InjectionToken<any>('EDITORJS_MODULE_IMPORT');
export const EDITORJS_MODULE_FACTORY = new InjectionToken<any>('EDITORJS_MODULE_FACTORY');

@Injectable({
  providedIn: 'root'
})
export class EditorJSInstance extends EditorJS {
  constructor(@Inject(EDITORJS_IMPORT_CONFIG) config: EditorConfig) {
    super(config);
    console.log(Object.getOwnPropertyNames(this));
  }

  get version() {
    return EditorJS.version;
  }
}

@Injectable({
  providedIn: 'root'
})
export class EditorFactory {
  constructor(@Inject(EDITORJS_MODULE_FACTORY) private editorFactory: any) {
    console.dir('editorFactory', editorFactory);
  }
  createInstance(config: EditorConfig) {
    //return new EditorJSInstance(config);
    return new (this.editorFactory as any)(config);
    // return new class EditorJSInstance extends this.editorFactory {
    //   constructor() {
    //     super(config);
    //     console.log(Object.getOwnPropertyNames(this));
    //   }

    //   get version() {
    //     return EditorJS.version;
    //   }
    // }();
  }
}
