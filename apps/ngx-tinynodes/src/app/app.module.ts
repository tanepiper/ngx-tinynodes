import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEditorJSModule } from '@tinynodes/ngx-editorjs';
import { AppComponent } from './app.component';
import EditorJS from '@editorjs/editorjs';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxEditorJSModule.forRoot({
      editorjs: {
        autofocus: false,
        holder: '',
        initialBlock: 'paragraph',
        tools: [],
        data: {
          time: Date.now(),
          version: EditorJS.version,
          blocks: []
        }
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
