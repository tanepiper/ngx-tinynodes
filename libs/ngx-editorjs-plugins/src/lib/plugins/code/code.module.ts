import { NgModule } from '@angular/core';
import {
  createPluginConfig,
  EDITOR_JS_TOOL_INJECTOR,
  PLUGIN_CONFIG,
  PluginClasses,
  PluginTypes
} from '../../types/plugins';
import Code from '@editorjs/code';

/**
 * A module that provides the default EditorJS `<code>` block tool.
 * See [the GitHub repo](https://github.com/editor-js/code) for API details
 */
@NgModule({
  providers: [{
    provide: EDITOR_JS_TOOL_INJECTOR,
    useValue: Code,
    multi: true
  }, {
    provide: PLUGIN_CONFIG,
    useValue: {
      key: 'code',
      type: PluginTypes.Block,
      pluginName: 'EditorJS Code'
    },
    multi: true
  }, {
    provide: PluginClasses,
    useFactory: createPluginConfig,
    deps: [PLUGIN_CONFIG, EDITOR_JS_TOOL_INJECTOR]
  }]
})
export class PluginCodeModule {
}
