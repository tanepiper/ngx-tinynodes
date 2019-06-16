import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { FOR_ROOT_OPTIONS_TOKEN, NgxEditorJSModuleConfig } from './types/config';
import { NgxEditorJSComponentModule } from './containers/editorjs/editorjs.module';
import { NgxEditorJSMatFieldModule } from './containers/editorjs-mat-field/editorjs-mat-field.module';

/**
 * The `@tinynodes/ngx-editorjs` module provides the directive, service and components to use `EditorJS`
 * within Angular and Material.
 *
 * To use import the module `NgxEditorJSModule.forRoot()` into the root of your application.
 * The `forRoot` method takes an optional `NgxEditorJSModuleConfig` config, this will provide a
 * default instance.
 */
@NgModule({
  imports: [NgxEditorJSComponentModule, NgxEditorJSMatFieldModule],
  exports: [NgxEditorJSComponentModule, NgxEditorJSMatFieldModule]
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
        }
      ]
    };
  }
}
