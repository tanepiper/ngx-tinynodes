import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { NgxEditorJSComponentModule } from '../editorjs/editorjs.module';
import { NgxEditorJSMatFieldComponent } from './editorjs-mat-field.component';
import { FOR_ROOT_OPTIONS_TOKEN, NgxEditorJSModuleConfig } from '../../types/config';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [NgxEditorJSComponentModule, MatInputModule, MatFormFieldModule],
  declarations: [NgxEditorJSMatFieldComponent],
  exports: [NgxEditorJSComponentModule, NgxEditorJSMatFieldComponent]
})
export class NgxEditorJSMatFieldModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: NgxEditorJSMatFieldModule
  ) {}

  /**
   * Use this method in the root of the application.  You can pass an optional configuration
   * which sets some defaults, or use the provided defaults.
   * @param config The optional configuration to pass
   */
  static forRoot(@Optional() config?: NgxEditorJSModuleConfig): ModuleWithProviders {
    return {
      ngModule: NgxEditorJSMatFieldModule,
      providers: [
        {
          provide: FOR_ROOT_OPTIONS_TOKEN,
          useValue: config
        }
      ]
    };
  }
}
