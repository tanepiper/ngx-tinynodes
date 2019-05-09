import { CommonModule } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import { NgxEditorJSComponent } from './containers/editorjs-component/editorjs.component';
import { NgxEditorJSDirective } from './directives/ngx-editorjs.directive';
import { NgxEditorJSService } from './services/editorjs.service';
import {
  EditorJSConfig,
  NgxEditorJSConfig,
  NGX_EDITORJS_CONFIG
} from './types/config';

const DEFAULT_TOOLS = {
  header: Header,
  list: List
};

const DEFAULT_CONFIG: NgxEditorJSConfig = {
  editorjs: { autofocus: false, tools: {} }
};

const DEFAULT_HOLDER = 'editor-js';

/**
 * The ngx-editorjs module provides a collection of features to allow
 * any Angular app to use and control an [EditorJS](http://editorjs.io)
 * instance
 *
 * To use import the module `NgxEditorJSModule` into the root of your application,
 * this will provide a default instance
 *
 * If you want to overide it in a feature you can call the `.withConfig` method
 */
@NgModule({
  imports: [CommonModule],
  declarations: [NgxEditorJSComponent, NgxEditorJSDirective],
  exports: [NgxEditorJSComponent, NgxEditorJSDirective],
  providers: [
    NgxEditorJSService,
    [
      {
        provide: NGX_EDITORJS_CONFIG,
        useValue: {
          editorjs: NgxEditorJSModule.createEditorJSConfig(DEFAULT_CONFIG)
        }
      }
    ]
  ]
})
export class NgxEditorJSModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: NgxEditorJSModule
  ) {}

  static withConfig(
    config: NgxEditorJSConfig = DEFAULT_CONFIG
  ): ModuleWithProviders {
    return {
      ngModule: NgxEditorJSModule,
      providers: [
        {
          provide: NGX_EDITORJS_CONFIG,
          useValue: {
            editorjs: NgxEditorJSModule.createEditorJSConfig(config)
          }
        }
      ]
    };
  }

  /**
   * Creates a default configuration
   * @param config
   */
  static createEditorJSConfig(config: NgxEditorJSConfig): EditorJSConfig {
    const newConfig: EditorJSConfig = {
      autofocus: config.editorjs.autofocus,
      holder: config.editorjs.holder || DEFAULT_HOLDER,
      tools: { ...DEFAULT_TOOLS, ...config.editorjs.tools }
    };
    if (config.editorjs.initialBlock) {
      newConfig.initialBlock = config.editorjs.initialBlock;
    }
    if (config.editorjs.data) {
      newConfig.data = config.editorjs.data;
    }
    return newConfig;
  }
}
