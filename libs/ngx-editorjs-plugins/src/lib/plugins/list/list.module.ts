import { NgModule } from '@angular/core';
import { PluginList } from './list.plugin';

/**
 * A module that provides the default EditorJS `<li>` and `<ol>` block tool.
 * See [the GitHub repo](https://github.com/editor-js/list) for API details
 */
@NgModule({
  providers: [PluginList]
})
export class PluginListModule {}
