import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import {
  InitialPlugins,
  NgxEditorJSPluginServiceModule,
  PluginConfig,
  PluginHeader,
  PluginHeaderModule,
  PluginList,
  PluginListModule,
  PluginParagraph,
  PluginParagraphModule
} from '@tinynodes/ngx-editorjs-plugins';
import { NgxEditorJSComponent } from './containers/editorjs-component/editorjs.component';
import { NgxEditorJSDirective } from './directives/ngx-editorjs.directive';
import { NgxEditorJSService } from './services/editorjs.service';
import { NgxEditorJSConfig, NGX_EDITORJS_CONFIG } from './types/config';

/**
 * Factory method for creating the initial set of tool plugins used with the
 * editor
 */
export function createTools(): PluginConfig {
  return { header: new PluginHeader(), list: new PluginList(), paragraph: new PluginParagraph() };
}

/**
 * A default configuration used by each EditorJS instance
 */
const DEFAULT_CONFIG: NgxEditorJSConfig = {
  editorjs: { autofocus: false, initialBlock: 'paragraph', holder: 'editor-js' }
};

/**
 * The `@tinynodes/ngx-editorjs` module provides a collection of features to allow
 * any Angular app to use and control an [EditorJS](http://editorjs.io) instance
 *
 * To use import the module `NgxEditorJSModule.forRoot()` into the root of your application.
 * The `forRoot` method takes an optional `NgxEditorJSConfig` config, this will provide a
 * default instance.
 */
@NgModule({
  imports: [CommonModule, PluginHeaderModule, PluginListModule, PluginParagraphModule, NgxEditorJSPluginServiceModule],
  declarations: [NgxEditorJSComponent, NgxEditorJSDirective],
  exports: [NgxEditorJSComponent, NgxEditorJSDirective],
  providers: [
    NgxEditorJSService,
    {
      provide: InitialPlugins,
      useFactory: createTools
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
  static forRoot(config: NgxEditorJSConfig = DEFAULT_CONFIG): ModuleWithProviders {
    return {
      ngModule: NgxEditorJSModule,
      providers: [
        {
          provide: NGX_EDITORJS_CONFIG,
          useValue: {
            editorjs: {
              autofocus: config.editorjs.autofocus || DEFAULT_CONFIG.editorjs.autofocus,
              holder: config.editorjs.holder || DEFAULT_CONFIG.editorjs.holder,
              initialBlock: config.editorjs.initialBlock || DEFAULT_CONFIG.editorjs.initialBlock,
              data: config.editorjs.data
            }
          }
        }
      ]
    };
  }
}
