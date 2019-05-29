import { NgModule } from '@angular/core';
import {
  EDITOR_JS_TOOL_INJECTOR,
  PLUGIN_CONFIG,
  PluginTypes
} from '../../types/plugins';
import Paragraph from '@editorjs/paragraph';


/**
 * A module that provides the default EditorJS `<p>` block tool.
 * See [the GitHub repo](https://github.com/editor-js/paragraph) for API details
 */
@NgModule({
  providers: [{
    provide: EDITOR_JS_TOOL_INJECTOR,
    useValue: Paragraph,
    multi: true
  }, {
    provide: PLUGIN_CONFIG,
    useValue: {
      key: 'paragraph',
      type: PluginTypes.Block,
      pluginName: 'EditorJS Paragraph',
    },
    multi: true
  }]
})
export class PluginParagraphModule {
}
