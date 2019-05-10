import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { NgxEditorJSModule } from '@tinynodes/ngx-editorjs';
import { NgxEditorjsDemoModule } from '@tinynodes/ngx-editorjs-demo';
import { MarkdownModule } from 'ngx-markdown';
import { environment } from '../environments/environment';
import { AppComponent } from './components/app-component/app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SidebarComponent } from './components/sidebar-component/sidebar.component';
import { MaterialModule } from './material.module';
import { ApplicationDataModule } from './store/app/application.module';

/**
 * The main `ngx-tinynodes` module that builds the core single page application.
 * To view the application visit [the demo](https://tinynodes-ngx.firebaseapp.com/)
 */
@NgModule({
  declarations: [AppComponent, NavBarComponent, SidebarComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ApplicationDataModule,
    RouterModule.forRoot([]),
    NgxEditorJSModule.forRoot(),
    NgxEditorjsDemoModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    environment.production ? [] : [AkitaNgDevtools.forRoot(), AkitaNgRouterStoreModule.forRoot()]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
