import { NgModule } from '@angular/core';
import { EDITOR_JS_TOOL_INJECTOR, PLUGIN_CONFIG, PluginTypes } from '../../types/plugins';
import Embed from '@editorjs/embed';

/**
 * A module that provides the default EditorJS `<p>` block tool.
 * See [the GitHub repo](https://github.com/editor-js/paragraph) for API details
 */
@NgModule({
  providers: [
    {
      provide: EDITOR_JS_TOOL_INJECTOR,
      useValue: Embed,
      multi: true
    },
    {
      provide: PLUGIN_CONFIG,
      useValue: {
        key: 'embed',
        type: PluginTypes.Block,
        pluginName: 'EditorJS Embed Block',
        inlineToolbar: true
      },
      multi: true
    }
  ]
})
export class PluginEmbedModule {}
