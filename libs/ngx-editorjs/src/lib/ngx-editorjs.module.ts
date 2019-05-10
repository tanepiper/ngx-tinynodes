import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { createTools, defaultConfig } from './config';
import { NgxEditorJSComponent } from './containers/editorjs-component/editorjs.component';
import { NgxEditorJSDirective } from './directives/ngx-editorjs.directive';
import { PluginHeaderModule } from './plugins/header/header.module';
import { ListHeaderModule } from './plugins/list/list.module';
import { NgxEditorJSService } from './services/editorjs.service';
import { PluginService } from './services/plugins.service';
import { NgxEditorJSConfig, NgxEditorJSTools, NGX_EDITORJS_CONFIG } from './types/config';
import { InitialPlugins } from './types/plugins';

const DEFAULT_CONFIG: NgxEditorJSConfig = defaultConfig();

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
  imports: [CommonModule, PluginHeaderModule, ListHeaderModule],
  declarations: [NgxEditorJSComponent, NgxEditorJSDirective],
  exports: [NgxEditorJSComponent, NgxEditorJSDirective],
  providers: [
    NgxEditorJSService,
    {
      provide: InitialPlugins,
      useFactory: createTools
    },
    PluginService,
    PluginHeaderModule
  ]
})
export class NgxEditorJSModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: NgxEditorJSModule
  ) {}

  static forRoot(tools?: NgxEditorJSTools, config: NgxEditorJSConfig = DEFAULT_CONFIG): ModuleWithProviders {
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
