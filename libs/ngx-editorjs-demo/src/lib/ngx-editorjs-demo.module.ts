import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { NgxEditorJSModule, UserPlugins } from '@tinynodes/ngx-editorjs';
import {
  PluginCodeModule,
  PluginLinkModule,
  PluginMarkerModule,
  PluginSimpleImageModule
} from '@tinynodes/ngx-editorjs-plugins';
import { MarkdownModule } from 'ngx-markdown';
import { createNgxEditorJSDemoTools } from './config';
import { EditorPageComponent } from './containers/editor-page/editor-page.component';
import { PageContainerComponent } from './containers/page-container/page-container.component';
import { ngxEditorjsDemoRoutes } from './ngx-editorjs-demo.routes';
import { PageStoreModule } from './store/pages/pages.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ngxEditorjsDemoRoutes),
    MarkdownModule.forChild(),
    ReactiveFormsModule,
    PageStoreModule,
    NgxEditorJSModule,
    PluginCodeModule,
    PluginSimpleImageModule,
    PluginLinkModule,
    PluginMarkerModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: UserPlugins,
      useFactory: createNgxEditorJSDemoTools
    }
  ],
  declarations: [EditorPageComponent, PageContainerComponent],
  exports: [EditorPageComponent, PageStoreModule, PageContainerComponent],
  entryComponents: [PageContainerComponent]
})
export class NgxEditorjsDemoModule {}
