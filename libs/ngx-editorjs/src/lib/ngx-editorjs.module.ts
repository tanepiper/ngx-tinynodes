import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf, InjectionToken, forwardRef } from '@angular/core';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import { NgxEditorJSComponent } from './containers/editorjs-component/editorjs.component';
import { NgxEditorJSDirective } from './directives/ngx-editorjs.directive';
import { NgxEditorJSService } from './services/editorjs.service';
import { NgxEditorJSConfig, NGX_EDITORJS_CONFIG, HEADER_TOOL, LIST_TOOL } from './types/config';

const DEFAULT_TOOLS = {
  header: Header,
  list: List
};

const DEFAULT_HOLDER = 'editor-js';

const DEFAULT_CONFIG: NgxEditorJSConfig = {
  editorjs: { autofocus: false, tools: DEFAULT_TOOLS, holder: DEFAULT_HOLDER, initialBlock: 'paragraph' }
};

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
    {
      provide: HEADER_TOOL,
      useValue: Header
    },
    {
      provide: LIST_TOOL,
      useValue: List
    }
  ]
})
export class NgxEditorJSModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: NgxEditorJSModule
  ) {}

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
              tools: { ...DEFAULT_CONFIG.editorjs.tools, ...config.editorjs.tools },
              initialBlock: config.editorjs.initialBlock || DEFAULT_CONFIG.editorjs.initialBlock,
              data: config.editorjs.data
            }
          }
        }
      ]
    };
  }
}
