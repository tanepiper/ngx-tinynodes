import { NgModule } from '@angular/core';
import { EDITOR_JS_TOOL_INJECTOR, PluginClasses, PLUGIN_CONFIG } from '../types/plugins';
import { createPluginConfig } from '../util/plugin';
import { NgxEditorJSPluginService } from './plugin-service.service';

@NgModule({
  providers: [
    {
      provide: PLUGIN_CONFIG,
      useValue: undefined,
      multi: true
    },
    {
      provide: EDITOR_JS_TOOL_INJECTOR,
      useValue: undefined,
      multi: true
    },
    {
      provide: PluginClasses,
      useFactory: createPluginConfig,
      deps: [PLUGIN_CONFIG, EDITOR_JS_TOOL_INJECTOR]
    },
    NgxEditorJSPluginService
  ]
})
export class NgxEditorJSPluginServiceModule {}
