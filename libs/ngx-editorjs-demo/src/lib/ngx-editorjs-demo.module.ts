import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { NgxEditorJSModule } from '@tinynodes/ngx-editorjs';
import {
  PluginCodeModule,
  PluginHeaderModule,
  PluginLinkModule,
  PluginListModule,
  PluginMarkerModule,
  PluginParagraphModule,
  PluginSimpleImageModule
} from '@tinynodes/ngx-editorjs-plugins';
import { PageContainerComponent } from './containers/page-container/page-container.component';
import { ngxEditorjsDemoRoutes } from './ngx-editorjs-demo.routes';
import { PageStoreModule } from './store/pages/pages.module';
import { NgxTinynodesCoreModule } from '@tinynodes/ngx-tinynodes-core';
import { NgxEditorJSDemoHomeComponent } from './containers/home-container/home-container.component';
import { NgxEditorJSDemoTagComponent } from './components/tag-component/tag.component';
import { NgxEditorJSDemoMaterialModule } from './ngx-editorjs-demo.material.module';

import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
  imports: [
    CommonModule,
    NgxJsonViewerModule,
    RouterModule.forChild(ngxEditorjsDemoRoutes),
    ReactiveFormsModule,
    PageStoreModule,
    NgxEditorJSModule,
    PluginHeaderModule,
    PluginParagraphModule,
    PluginListModule,
    PluginCodeModule,
    PluginSimpleImageModule,
    PluginLinkModule,
    PluginMarkerModule,
    NgxTinynodesCoreModule,
    NgxEditorJSDemoMaterialModule
  ],
  declarations: [PageContainerComponent, NgxEditorJSDemoHomeComponent, NgxEditorJSDemoTagComponent],
  exports: [PageStoreModule, PageContainerComponent],
  entryComponents: [PageContainerComponent]
})
export class NgxEditorjsDemoModule {}
