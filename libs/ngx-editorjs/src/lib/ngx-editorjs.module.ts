import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { NgxEditorJSComponent } from './containers/editorjs-component/editorjs.component';
import { NgxEditorJSDirective } from './directives/ngx-editorjs.directive';
import { NgxEditorJSService } from './services/editorjs.service';
import { NgxEditorJSPluginService } from './services/plugins.service';
import { EditorJSConfig, NgxEditorJSConfig, NGX_EDITORJS_CONFIG } from './types/config';

/**
 * The default holder ID to attach `EditorJS` to
 */
const DEFAULT_HOLDER_ID = 'editor-js';

/**
 * Creates a configuration for EditorJS
 * @param config Optional module configurations
 */
export function createConfig(config?: NgxEditorJSConfig): NgxEditorJSConfig {
  if (!config || !config.editorjs) {
    return {
      editorjs: {
        holder: DEFAULT_HOLDER_ID
      }
    };
  }
  const editorJsConfig: EditorJSConfig = {};
  if (config.editorjs.autofocus) {
    editorJsConfig.autofocus = config.editorjs.autofocus;
  }
  if (config.editorjs.data) {
    editorJsConfig.data = config.editorjs.data;
  }
  if (config.editorjs.hideToolbar) {
    editorJsConfig.hideToolbar = config.editorjs.hideToolbar;
  }
  if (config.editorjs.initialBlock) {
    editorJsConfig.initialBlock = config.editorjs.initialBlock;
  }
  if (config.editorjs.minHeight) {
    editorJsConfig.minHeight = config.editorjs.minHeight;
  }
  if (config.editorjs.placeholder) {
    editorJsConfig.placeholder = config.editorjs.placeholder;
  }
  if (config.editorjs.sanitizer) {
    editorJsConfig.sanitizer = config.editorjs.sanitizer;
  }

  return {
    editorjs: {
      holder: config.editorjs.holder || DEFAULT_HOLDER_ID,
      ...editorJsConfig
    }
  };
}

/**
 * Internal token for injecting the `NgxEditorJSConfig` into the config factory
 */
export const FOR_ROOT_OPTIONS_TOKEN = new InjectionToken<NgxEditorJSConfig>('forRoot() NgxEditorJSConfig.');

/**
 * The `@tinynodes/ngx-editorjs` module provides a collection of features to allow
 * any Angular app to use and control an [EditorJS](http://editorjs.io) instance
 *
 * To use import the module `NgxEditorJSModule.forRoot()` into the root of your application.
 * The `forRoot` method takes an optional `NgxEditorJSConfig` config, this will provide a
 * default instance.
 */
@NgModule({
  imports: [CommonModule],
  declarations: [NgxEditorJSComponent, NgxEditorJSDirective],
  exports: [NgxEditorJSComponent, NgxEditorJSDirective],
  providers: [NgxEditorJSService, NgxEditorJSPluginService]
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
          useFactory: createConfig,
          deps: [FOR_ROOT_OPTIONS_TOKEN]
        }
      ]
    };
  }
}
