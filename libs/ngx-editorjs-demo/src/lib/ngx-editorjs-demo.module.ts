import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import EditorJSCode from '@editorjs/code';
import EditorJSImage from '@editorjs/image';
import EditorJSList from '@editorjs/list';
import EditorJSMarker from '@editorjs/marker';
import { NgxEditorJSModule } from '@tinynodes/ngx-editorjs';
import { MarkdownModule } from 'ngx-markdown';
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
    NgxEditorJSModule
  ],
  declarations: [EditorPageComponent, PageContainerComponent],
  exports: [EditorPageComponent, PageStoreModule, PageContainerComponent],
  entryComponents: [PageContainerComponent]
})
export class NgxEditorjsDemoModule {}
