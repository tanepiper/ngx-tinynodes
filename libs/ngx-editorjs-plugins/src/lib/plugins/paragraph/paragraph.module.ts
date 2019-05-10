import { NgModule } from '@angular/core';
import { PluginParagraph } from './paragraph.plugin';

/**
 * Internal module to provide the Paragraph block editor
 */
@NgModule({
  providers: [PluginParagraph]
})
export class PluginParagraphModule {}
