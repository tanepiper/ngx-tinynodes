import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgxEditorJSModule } from '@tinynodes/ngx-editorjs';

@NgModule({
  imports: [CommonModule, NgxEditorJSModule, EffectsModule.forFeature([])]
})
export class NgxEditorjsNgrxModule {}
