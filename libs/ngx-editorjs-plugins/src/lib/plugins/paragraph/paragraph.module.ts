import { NgModule } from '@angular/core';
import { PluginParagraph } from './paragraph.plugin';

/**
 * A module that provides the default `EditorJS` `<p>` block tool.
 * See [the GitHub repo](https://github.com/editor-js/paragraph) for API details
 */
@NgModule({
  providers: [PluginParagraph]
})
export class PluginParagraphModule {}
