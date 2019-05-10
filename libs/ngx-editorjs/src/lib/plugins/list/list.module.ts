import { NgModule } from '@angular/core';
import { PluginList } from './list.plugin';

/**
 * Internal module to provide the List block editor
 */
@NgModule({
  providers: [PluginList]
})
export class PluginListModule {}
