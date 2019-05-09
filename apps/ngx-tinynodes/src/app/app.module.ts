import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgxEditorJSModule } from '@tinynodes/ngx-editorjs';
import { NgxEditorjsDemoModule } from '@tinynodes/ngx-editorjs-demo';
import { MarkdownModule } from 'ngx-markdown';
import { AppComponent } from './components/app-component/app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SidebarComponent } from './components/sidebar-component/sidebar.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, NavBarComponent, SidebarComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    NgxEditorJSModule,
    NgxEditorjsDemoModule,
    MarkdownModule.forRoot({ loader: HttpClient })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
