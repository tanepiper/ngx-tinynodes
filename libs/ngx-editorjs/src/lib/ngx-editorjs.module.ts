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
  editorjs: { autofocus: false, tools: DEFAULT_TOOLS }
};

@NgModule({
  imports: [CommonModule],
  declarations: [NgxEditorJSComponent, NgxEditorJSDirective],
  exports: [NgxEditorJSComponent, NgxEditorJSDirective],
  providers: [NgxEditorJSService]
})
export class NgxEditorJSModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: NgxEditorJSModule
  ) {}

  static forRoot(
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

  static createEditorJSConfig(config: NgxEditorJSConfig): EditorJSConfig {
    const newConfig: EditorJSConfig = {
      autofocus: config.editorjs.autofocus || false,
      tools: { ...DEFAULT_TOOLS, ...config.editorjs.tools }
    };
    if (config.editorjs.initialBlock) {
      newConfig.initialBlock = config.editorjs.initialBlock;
    }
    return newConfig;
  }
}
