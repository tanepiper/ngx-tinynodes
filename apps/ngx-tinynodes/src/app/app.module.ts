import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { NgxEditorJSModule } from '@tinynodes/ngx-editorjs';
import { NgxEditorjsDemoModule } from '@tinynodes/ngx-editorjs-demo';
import { MarkdownModule } from 'ngx-markdown';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppContainerComponent } from './containers/app/app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SidebarComponent } from './components/sidebar-component/sidebar.component';
import { MaterialModule } from './material.module';
import { HomePageComponent } from './pages/home/home-page.component';
import { MatButtonModule } from '@angular/material';
import { ApplicationDataModule, NgxTinynodesCoreModule } from '@tinynodes/ngx-tinynodes-core';

/**
 * The main `ngx-tinynodes` module that builds the core single page application.
 * To view the application visit [the demo](https://tinynodes-ngx.firebaseapp.com/)
 */
@NgModule({
  declarations: [AppContainerComponent, NavBarComponent, SidebarComponent, HomePageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ApplicationDataModule,
    AppRoutingModule,
    NgxTinynodesCoreModule,
    NgxEditorJSModule.forRoot(),
    NgxEditorjsDemoModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    environment.production ? [] : [AkitaNgDevtools.forRoot(), AkitaNgRouterStoreModule.forRoot()]
  ],
  bootstrap: [AppContainerComponent]
})
export class AppModule {}
