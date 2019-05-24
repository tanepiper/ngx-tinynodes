import { NgModule } from '@angular/core';
import { NgxEditorJSToolbarComponent } from './editorjs-toolbar.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [NgxEditorJSToolbarComponent],
  exports: [NgxEditorJSToolbarComponent]
})
export class NgxEditorJSToolbarModule {}
