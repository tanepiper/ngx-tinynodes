import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgxEditorJSModule } from '@tinynodes/ngx-editorjs';

/**
 * **Warning**: This module is current in development and not yet published
 *
 * This module provides a set of [NGRX Effects](https://ngrx.io/guide/effects) that allow you to control
 * an `EditorJS` instance via store actions.
 */
@NgModule({
  imports: [CommonModule, NgxEditorJSModule, EffectsModule.forFeature([])]
})
export class NgxEditorjsNgrxModule {}
