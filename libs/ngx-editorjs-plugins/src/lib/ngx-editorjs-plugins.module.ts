import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PluginCodeModule } from './plugins/code/code.module';
import { PluginHeaderModule } from './plugins/header/header.module';
import { PluginImageModule } from './plugins/image/image.module';
import { PluginLinkModule } from './plugins/link/link.module';
import { PluginListModule } from './plugins/list/list.module';
import { PluginMarkerModule } from './plugins/marker/marker.module';
import { PluginParagraphModule } from './plugins/paragraph/paragraph.module';
import { PluginSimpleImageModule } from './plugins/simple-image/simple-image.module';

/**
 * The `NgxEditorjsPluginsModule` provides several additional modules
 * that provide a way to easily plug in block and inline tools for `EditorJS`.
 *
 * Importing `NgxEditorjsPluginsModule` will include all modules, while it
 * is also possible to import each individual module as required.
 */
@NgModule({
  imports: [
    CommonModule,
    PluginCodeModule,
    PluginHeaderModule,
    PluginImageModule,
    PluginLinkModule,
    PluginListModule,
    PluginMarkerModule,
    PluginParagraphModule,
    PluginSimpleImageModule
  ],
  exports: [
    PluginCodeModule,
    PluginHeaderModule,
    PluginImageModule,
    PluginLinkModule,
    PluginListModule,
    PluginMarkerModule,
    PluginParagraphModule,
    PluginSimpleImageModule
  ]
})
export class NgxEditorjsPluginsModule {}
