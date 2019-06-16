import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { NgxEditorJSComponentModule, NgxEditorJSModule } from '@tinynodes/ngx-editorjs';
import { PageContainerComponent } from './containers/page-container/page-container.component';
import { ngxEditorjsDemoRoutes } from './ngx-editorjs-demo.routes';
import { PageStoreModule } from './store/pages/pages.module';
import { NgxTinynodesCoreModule } from '@tinynodes/ngx-tinynodes-core';
import { NgxEditorJSDemoHomeComponent } from './containers/home-container/home-container.component';
import { NgxEditorJSDemoMaterialModule } from './ngx-editorjs-demo.material.module';

import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { NgxEditorjsPluginsModule } from '@tinynodes/ngx-editorjs-plugins';

@NgModule({
  imports: [
    CommonModule,
    NgxJsonViewerModule,
    RouterModule.forChild(ngxEditorjsDemoRoutes),
    ReactiveFormsModule,
    PageStoreModule,
    NgxTinynodesCoreModule,
    NgxEditorJSComponentModule,
    NgxEditorjsPluginsModule,
    NgxEditorJSDemoMaterialModule
  ],
  declarations: [PageContainerComponent, NgxEditorJSDemoHomeComponent],
  exports: [PageStoreModule, PageContainerComponent],
  entryComponents: [PageContainerComponent]
})
export class NgxEditorjsDemoModule {}
