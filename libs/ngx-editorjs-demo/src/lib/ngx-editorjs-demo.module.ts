import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import EditorJSCode from '@editorjs/code';
import EditorJSImage from '@editorjs/image';
import EditorJSList from '@editorjs/list';
import EditorJSMarker from '@editorjs/marker';
import { NgxEditorJSModule, UserPlugins } from '@tinynodes/ngx-editorjs';
import { MarkdownModule } from 'ngx-markdown';
import { EditorPageComponent } from './containers/editor-page/editor-page.component';
import { PageContainerComponent } from './containers/page-container/page-container.component';
import { ngxEditorjsDemoRoutes } from './ngx-editorjs-demo.routes';
import { PageStoreModule } from './store/pages/pages.module';
import { CodeModule } from './plugins/code/code.module';
import { createTools } from './config';
import { SimpleImageModule } from './plugins/simple-image/simple-image.module';
import { LinkModule } from './plugins/link/link.module';
import { MarkerModule } from './plugins/marker/marker.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ngxEditorjsDemoRoutes),
    MarkdownModule.forChild(),
    ReactiveFormsModule,
    PageStoreModule,
    NgxEditorJSModule,
    CodeModule,
    SimpleImageModule,
    LinkModule,
    MarkerModule
  ],
  providers: [
    {
      provide: UserPlugins,
      useFactory: createTools
    }
  ],
  declarations: [EditorPageComponent, PageContainerComponent],
  exports: [EditorPageComponent, PageStoreModule, PageContainerComponent],
  entryComponents: [PageContainerComponent]
})
export class NgxEditorjsDemoModule {}
