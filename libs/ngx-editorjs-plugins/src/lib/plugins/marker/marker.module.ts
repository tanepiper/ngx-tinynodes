import { NgModule } from '@angular/core';
import {

  EDITOR_JS_TOOL_INJECTOR,
  PLUGIN_CONFIG,
  PluginClasses,
  PluginTypes
} from '../../types/plugins';
import Marker from '@editorjs/paragraph';
import { createPluginConfig } from '../../util/plugin';


/**
 * A module that provides the default EditorJS `<p>` block tool.
 * See [the GitHub repo](https://github.com/editor-js/paragraph) for API details
 */
@NgModule({
  providers: [{
    provide: EDITOR_JS_TOOL_INJECTOR,
    useValue: Marker,
    multi: true
  }, {
    provide: PLUGIN_CONFIG,
    useValue: {
      key: 'paragraph',
      type: PluginTypes.Inline,
      pluginName: 'EditorJS Marker',
      shortcut: 'CTRL+SHIFT+M'
    },
    multi: true
  }]
})
export class PluginMarkerModule {
}
