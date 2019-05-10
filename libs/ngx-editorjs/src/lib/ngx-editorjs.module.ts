import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { NgxEditorJSComponent } from './containers/editorjs-component/editorjs.component';
import { NgxEditorJSDirective } from './directives/ngx-editorjs.directive';
import { PluginHeaderModule } from './plugins/header/header.module';
import { PluginListModule } from './plugins/list/list.module';
import { NgxEditorJSService } from './services/editorjs.service';
import { PluginService } from './services/plugins.service';
import { NgxEditorJSConfig, NgxEditorJSTools, NGX_EDITORJS_CONFIG } from './types/config';
import { InitialPlugins, PluginConfig } from './types/plugins';
import { PluginHeader } from './plugins/header/header.plugin';
import { PluginList } from './plugins/list/list.plugin';
import { PluginParagraphModule } from './plugins/paragraph/paragraph.module';
import { PluginParagraph } from './plugins/paragraph/paragraph.plugin';

export function defaultConfig() {
  return {
    editorjs: { autofocus: false, initialBlock: 'paragraph', holder: 'editor-js' }
  };
}

export function createTools(): PluginConfig {
  return { header: new PluginHeader(), list: new PluginList(), paragraph: new PluginParagraph() };
}

const DEFAULT_CONFIG: NgxEditorJSConfig = defaultConfig();

/**
 * The ngx-editorjs module provides a collection of features to allow
 * any Angular app to use and control an [EditorJS](http://editorjs.io)
 * instance
 *
 * To use import the module `NgxEditorJSModule.forRoot()` into the root of your application,
 * this will provide a default instance, import with `NgxEditorJSModule` in feature modules
 */
@NgModule({
  imports: [CommonModule, PluginHeaderModule, PluginListModule, PluginParagraphModule],
  declarations: [NgxEditorJSComponent, NgxEditorJSDirective],
  exports: [
    NgxEditorJSComponent,
    NgxEditorJSDirective,
    PluginHeaderModule,
    PluginParagraphModule,
    PluginParagraphModule
  ],
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
