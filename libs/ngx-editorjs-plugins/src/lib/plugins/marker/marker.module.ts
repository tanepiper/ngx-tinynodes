import { NgModule } from '@angular/core';
import { PluginMarker } from './marker.plugin';

/**
 * A module that provides the default EditorJS inline marker tool.
 * See [the GitHub repo](https://github.com/editor-js/marker) for API details
 */
@NgModule({
  providers: [PluginMarker]
})
export class PluginMarkerModule {}
