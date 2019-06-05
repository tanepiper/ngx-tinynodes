import { NgModule } from '@angular/core';
import { EDITOR_JS_TOOL_INJECTOR, PLUGIN_CONFIG, PluginTypes } from '../../types/plugins';
import InlineCode from '@editorjs/inline-code';

/**
 * A module that provides the default EditorJS `<p>` block tool.
 * See [the GitHub repo](https://github.com/editor-js/paragraph) for API details
 */
@NgModule({
  providers: [
    {
      provide: EDITOR_JS_TOOL_INJECTOR,
      useValue: InlineCode,
      multi: true
    },
    {
      provide: PLUGIN_CONFIG,
      useValue: {
        key: 'inline-code',
        type: PluginTypes.Inline,
        pluginName: 'EditorJS Inline Code',
        shortcut: 'CTRL+SHIFT+C'
      },
      multi: true
    }
  ]
})
export class PluginInlineCodeModule {
}
