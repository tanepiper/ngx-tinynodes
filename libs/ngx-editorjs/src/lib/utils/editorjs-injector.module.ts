import { NgModule } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import { EditorJSInstanceService, EDITORJS_MODULE_IMPORT } from './editorjs-injector';

/**
 * This module provides EditorJS as an injectable item and a factory to create EditorJS instances
 */
@NgModule({
  providers: [
    EditorJSInstanceService,
    {
      provide: EDITORJS_MODULE_IMPORT,
      useValue: EditorJS
    }
  ]
})
export class EditorJSInstanceModule {}
