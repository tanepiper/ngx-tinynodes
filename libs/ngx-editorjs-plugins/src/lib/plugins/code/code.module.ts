import { NgModule } from '@angular/core';
import { PluginCode } from './code.plugin';

/**
 * A module that provides the default `EditorJS` `<code>` block tool.
 * See [the GitHub repo](https://github.com/editor-js/code) for API details
 */
@NgModule({
  providers: [PluginCode]
})
export class PluginCodeModule {}
