import { NgModule } from '@angular/core';
import {
  EDITOR_JS_TOOL_INJECTOR,
  PLUGIN_CONFIG,
  PluginClasses,
  PluginTypes
} from '../../types/plugins';

import Image from '@editorjs/image';
import { createPluginConfig } from '../../util/plugin';


/**
 * A module that provides the default EditorJS `<img>` block tool.
 * See [the GitHub repo](https://github.com/editor-js/image) for API details
 */
@NgModule({
  providers: [{
    provide: EDITOR_JS_TOOL_INJECTOR,
    useValue: Image,
    multi: true
  }, {
    provide: PLUGIN_CONFIG,
    useValue: {
      key: 'image',
      type: PluginTypes.Block,
      pluginName: 'EditorJS Image'
    },
    multi: true
  }]
})
export class PluginImageModule {}
