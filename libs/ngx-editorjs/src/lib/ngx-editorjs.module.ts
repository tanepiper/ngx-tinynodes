import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import EditorJS from '@editorjs/editorjs';
import { createModuleConfig } from './config/module-config';
import { NgxEditorJSMatFieldComponent } from './containers/editorjs-mat-field/editorjs-mat-field.component';
import { NgxEditorJSComponent } from './containers/editorjs/editorjs.component';
import { NgxEditorJSDirective } from './directives/ngx-editorjs.directive';
import { NgxEditorJSService } from './services/editorjs.service';
import { FOR_ROOT_OPTIONS_TOKEN, NgxEditorJSModuleConfig, NGX_EDITORJS_CONFIG } from './types/config';
import { EDITORJS_INSTANCE, EDITORJS_MODULE_IMPORT } from './types/injector';
import { NgxEditorJSToolbarComponent } from './components/editorjs-toolbar/editorjs-toolbar.component';
import { NgxEditorJSMaterialModule } from './ngx-editorjs.material.module';

/**
 * Factory function to return the EditorJS base class
 */
export function createEditorJSInstance(editorjs: any) {
  return editorjs;
}

/**
 * The `@tinynodes/ngx-editorjs` module provides a collection of features to allow
 * any Angular app to use and control an [EditorJS](http://editorjs.io) instance
 *
 * To use import the module `NgxEditorJSModule.forRoot()` into the root of your application.
 * The `forRoot` method takes an optional `NgxEditorJSModuleConfig` config, this will provide a
 * default instance.
 */
@NgModule({
  imports: [CommonModule, FormsModule, NgxEditorJSMaterialModule],
  declarations: [NgxEditorJSComponent, NgxEditorJSMatFieldComponent, NgxEditorJSDirective, NgxEditorJSToolbarComponent],
  exports: [
    NgxEditorJSComponent,
    NgxEditorJSMatFieldComponent,
    NgxEditorJSDirective,
    NgxEditorJSToolbarComponent,
    NgxEditorJSMaterialModule
  ],
  providers: [
    NgxEditorJSService,
    {
      provide: EDITORJS_MODULE_IMPORT,
      useValue: EditorJS
    },
    {
      provide: EDITORJS_INSTANCE,
      useFactory: createEditorJSInstance,
      deps: [EDITORJS_MODULE_IMPORT]
    }
  ]
})
export class NgxEditorJSModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: NgxEditorJSModule
  ) {}

  /**
   * Use this method in the root of the application.  You can pass an optional configuration
   * which sets some defaults, or use the provided defaults.
   * @param config The optional configuration to pass
   */
  static forRoot(@Optional() config?: NgxEditorJSModuleConfig): ModuleWithProviders {
    return {
      ngModule: NgxEditorJSModule,
      providers: [
        {
          provide: FOR_ROOT_OPTIONS_TOKEN,
          useValue: config
        },
        {
          provide: NGX_EDITORJS_CONFIG,
          useFactory: createModuleConfig,
          deps: [FOR_ROOT_OPTIONS_TOKEN]
        }
      ]
    };
  }
}
