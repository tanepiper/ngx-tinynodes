import { NgModule } from '@angular/core';
import { PluginLink } from './link.plugin';

/**
 * A module that provides the default `EditorJS` `<a>` block tool.
 * See [the GitHub repo](https://github.com/editor-js/link) for API details
 */
@NgModule({
  providers: [PluginLink]
})
export class PluginLinkModule {}
