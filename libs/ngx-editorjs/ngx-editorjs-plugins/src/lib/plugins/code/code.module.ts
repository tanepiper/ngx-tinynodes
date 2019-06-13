import { NgModule } from '@angular/core';
import { EDITOR_JS_TOOL_INJECTOR, PLUGIN_CONFIG, PluginClasses, PluginTypes } from '../../types/plugins';
import Code from '@editorjs/code';
import { createPluginConfig } from '../../util/plugin';

/**
 * A module that provides the default EditorJS `<code>` block tool.
 * See [the GitHub repo](https://github.com/editor-js/code) for API details
 */
@NgModule({
  providers: [
    {
      provide: EDITOR_JS_TOOL_INJECTOR,
      useValue: Code,
      multi: true
    },
    {
      provide: PLUGIN_CONFIG,
      useValue: {
        key: 'code',
        type: PluginTypes.Block,
        pluginName: 'EditorJS Code'
      },
      multi: true
    }
  ]
})
export class PluginCodeModule {}
