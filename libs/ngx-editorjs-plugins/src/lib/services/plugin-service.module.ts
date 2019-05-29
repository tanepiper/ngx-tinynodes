import { NgModule } from '@angular/core';
import {
  EDITOR_JS_TOOL_INJECTOR,
  PLUGIN_CONFIG,
  PluginClasses
} from '../types/plugins';
import {createPluginConfig} from '../util/plugin'

import {NgxEditorJSPluginService} from './plugin-service.service'

@NgModule({
  providers: [{
    provide: PluginClasses,
    useFactory: createPluginConfig,
    deps: [PLUGIN_CONFIG, EDITOR_JS_TOOL_INJECTOR]
  }, NgxEditorJSPluginService]
})
export class NgxPluginServiceModule {}
