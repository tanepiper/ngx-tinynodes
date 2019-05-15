import { NgModule } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import { EditorJSFactory, EDITORJS_MODULE_IMPORT } from './editorjs-injector';

/**
 * This module provides EditorJS as an injectable item and a factory to create EditorJS instances
 */
@NgModule({
  providers: [
    EditorJSFactory,
    {
      provide: EDITORJS_MODULE_IMPORT,
      useValue: EditorJS
    }
  ]
})
export class EditorJSInjectorModule {}
