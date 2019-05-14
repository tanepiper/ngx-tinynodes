import { NgModule } from '@angular/core';
import { EditorFactory, EditorJSInstance, EDITORJS_MODULE_IMPORT, EDITORJS_MODULE_FACTORY } from './editorjs-injector';
import EditorJS from '@editorjs/editorjs';

export function editorjsModuleFactory(instance) {
  return instance;
}

@NgModule({
  providers: [
    EditorFactory,
    EditorJSInstance,
    {
      provide: EDITORJS_MODULE_IMPORT,
      useValue: EditorJS
    },
    {
      provide: EDITORJS_MODULE_FACTORY,
      useFactory: editorjsModuleFactory,
      deps: [EDITORJS_MODULE_IMPORT]
    }
  ]
})
export class EditorJSInjectorModule {}
