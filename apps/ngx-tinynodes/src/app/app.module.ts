import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { NgxEditorjsDemoModule } from '@tinynodes/ngx-editorjs-demo';
import { ApplicationDataModule, NgxTinynodesCoreModule } from '@tinynodes/ngx-tinynodes-core';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { SidebarComponent } from './components/sidebar-component/sidebar.component';
import { AppContainerComponent } from './containers/app/app.component';
import { MaterialModule } from './material.module';
import { HomePageComponent } from './pages/home/home-page.component';
import { CommonModule } from '@angular/common';

const PLATFORM_IMPORTS = [BrowserModule, HttpClientModule];

const PRESENTATION_IMPORTS = [LayoutModule, MaterialModule, FlexLayoutModule, BrowserAnimationsModule];

const DEV_IMPORTS = [AkitaNgDevtools, AkitaNgRouterStoreModule];

/**
 * The main `ngx-tinynodes` module that builds the core single page application.
 * To view the application visit [the demo](https://tinynodes-ngx.firebaseapp.com/)
 */
@NgModule({
  declarations: [AppContainerComponent, NavBarComponent, SidebarComponent, HomePageComponent],
  imports: [
    CommonModule,
    ...PLATFORM_IMPORTS,
    ...PRESENTATION_IMPORTS,
    ApplicationDataModule,
    AppRoutingModule,
    NgxTinynodesCoreModule,
    NgxEditorjsDemoModule,
    environment.production ? [] : DEV_IMPORTS,
  ],
  bootstrap: [AppContainerComponent],
})
export class AppModule {}
