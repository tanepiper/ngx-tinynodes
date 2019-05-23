import { NgModule } from '@angular/core';
import { PluginHeader } from './header.plugin';

/**
 * A module that provides the default EditorJS header block tool.
 * See [the GitHub repo](https://github.com/editor-js/header) for API details
 */
@NgModule({
  providers: [PluginHeader]
})
export class PluginHeaderModule {}
