import { NgModule } from '@angular/core';
import { PluginSimpleImage } from './simple-image.plugin';

/**
 * A module that provides the simple image tools for `EditorJS` `<img>` block tool.
 * See [the GitHub repo](https://github.com/editor-js/image) for API details
 */
@NgModule({
  providers: [PluginSimpleImage]
})
export class PluginSimpleImageModule {}
