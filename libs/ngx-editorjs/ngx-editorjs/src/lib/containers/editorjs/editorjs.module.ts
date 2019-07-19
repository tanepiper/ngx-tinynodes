import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxEditorJSComponent } from './editorjs.component';
import { NgxEditorJSDirective } from '../../directives/ngx-editorjs.directive';
import { NGX_EDITORJS_CONFIG, NgxEditorJSModuleConfig } from '../../types/config';
import { FOR_ROOT_OPTIONS_TOKEN } from '../../types/config';
import { EDITORJS_MODULE_IMPORT, EditorJSInstance } from '../../types/injector';
import EditorJS from '@editorjs/editorjs';
import { NgxEditorJSService } from '../../services/editorjs.service';
import { createModuleConfig } from '../../config/module-config';
import { NgxEditorJSToolbarModule } from '../../components/toolbar/toolbar.module';

/**
 * Factory function to return the EditorJS base class
 */
export function createEditorJSInstance(editorjs: any) {
  return editorjs;
}

/**
 * Base module for the `NgxEditorJSComponent`, `NgxEditorJSDirective` and `NgxEditorJSService`.
 * All providers for the app are set here, however `FOR_ROOT_OPTIONS_TOKEN` can be set in any
 * `.forRoot`
 */
@NgModule({
  imports: [CommonModule, FormsModule, NgxEditorJSToolbarModule],
  declarations: [NgxEditorJSComponent, NgxEditorJSDirective],
  exports: [NgxEditorJSComponent, NgxEditorJSDirective, NgxEditorJSToolbarModule],
  providers: [
    NgxEditorJSService,
    {
      provide: FOR_ROOT_OPTIONS_TOKEN,
      useValue: {}
    },
    {
      provide: NGX_EDITORJS_CONFIG,
      useFactory: createModuleConfig,
      deps: [FOR_ROOT_OPTIONS_TOKEN]
    },
    {
      provide: EDITORJS_MODULE_IMPORT,
      useValue: EditorJS
    },
    {
      provide: EditorJSInstance,
      useFactory: createEditorJSInstance,
      deps: [EDITORJS_MODULE_IMPORT]
    }
  ]
})
export class NgxEditorJSComponentModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: NgxEditorJSComponentModule
  ) {}

  /**
   * Use this method in the root of the application.  You can pass an optional configuration
   * which sets some defaults, or use the provided defaults.
   * @param config The optional configuration to pass
   */
  static forRoot(@Optional() config?: NgxEditorJSModuleConfig): ModuleWithProviders {
    return {
      ngModule: NgxEditorJSComponentModule,
      providers: [
        {
          provide: FOR_ROOT_OPTIONS_TOKEN,
          useValue: config
        }
      ]
    };
  }
}
