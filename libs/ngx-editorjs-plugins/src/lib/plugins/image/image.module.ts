import { NgModule } from '@angular/core';
import { PluginImage } from './image.plugin';

/**
 * A module that provides the default `EditorJS` `<img>` block tool.
 * See [the GitHub repo](https://github.com/editor-js/image) for API details
 */
@NgModule({
  providers: [PluginImage]
})
export class PluginImageModule {}
