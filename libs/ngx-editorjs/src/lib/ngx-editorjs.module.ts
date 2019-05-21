import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import EditorJS from '@editorjs/editorjs';
import { createModuleConfig } from './config/module-config';
import { EditorJSContainerComponent } from './containers/base/container.class';
import { EditorJSFormField } from './containers/base/form-field.class';
import { NgxEditorJSMatFieldComponent } from './containers/editorjs-mat-field/editorjs-mat-field.component';
import { NgxEditorJSComponent } from './containers/editorjs/editorjs.component';
import { NgxEditorJSDirective } from './directives/ngx-editorjs.directive';
import { EditorJSInstance, EDITORJS_MODULE_IMPORT, NgxEditorJSInstanceService } from './services/editorjs-injector';
import { NgxEditorJSService } from './services/editorjs.service';
import { NgxEditorJSPluginService } from './services/plugins.service';
import { FOR_ROOT_OPTIONS_TOKEN, NgxEditorJSConfig, NGX_EDITORJS_CONFIG } from './types/config';

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
 * The `forRoot` method takes an optional `NgxEditorJSConfig` config, this will provide a
 * default instance.
 */
@NgModule({
  imports: [CommonModule, FormsModule, MatInputModule, MatFormFieldModule],
  declarations: [
    NgxEditorJSComponent,
    NgxEditorJSMatFieldComponent,
    NgxEditorJSDirective,
    EditorJSContainerComponent,
    EditorJSFormField
  ],
  exports: [NgxEditorJSComponent, NgxEditorJSMatFieldComponent, NgxEditorJSDirective, EditorJSContainerComponent],
  providers: [
    NgxEditorJSService,
    NgxEditorJSPluginService,
    NgxEditorJSInstanceService,
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
  static forRoot(@Optional() config?: NgxEditorJSConfig): ModuleWithProviders {
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
