import { NgModule } from '@angular/core';
import {
  createPluginConfig,
  EDITOR_JS_TOOL_INJECTOR,
  PLUGIN_CONFIG,
  PluginClasses,
  PluginTypes
} from '../../types/plugins';
import Header from '@editorjs/header';

/**
 * A module that provides the default EditorJS header block tool.
 * See [the GitHub repo](https://github.com/editor-js/header) for API details
 */
@NgModule({
  providers: [{
    provide: EDITOR_JS_TOOL_INJECTOR,
    useValue: Header,
    multi: true
  }, {
    provide: PLUGIN_CONFIG,
    useValue: {
      key: 'header',
      type: PluginTypes.Block,
      pluginName: 'EditorJS Header'
    },
    multi: true
  }, {
    provide: PluginClasses,
    useFactory: createPluginConfig,
    deps: [PLUGIN_CONFIG, EDITOR_JS_TOOL_INJECTOR],
  }]
})
export class PluginHeaderModule {}
