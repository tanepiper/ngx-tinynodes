import { NgModule } from '@angular/core';
import { PluginHeader } from './header.plugin';

/**
 * A module that provides the default `EditorJS` header plugin.
 * See [the GitHub repo](https://github.com/editor-js/header) for more details on
 * it's use
 */
@NgModule({
  providers: [PluginHeader]
})
export class PluginHeaderModule {}
