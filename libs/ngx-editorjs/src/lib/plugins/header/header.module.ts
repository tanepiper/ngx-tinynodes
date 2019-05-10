import { NgModule } from '@angular/core';
import { PluginHeader } from './header.plugin';

/**
 * Internal module to provide the Header block editor
 */
@NgModule({
  providers: [PluginHeader]
})
export class PluginHeaderModule {}
