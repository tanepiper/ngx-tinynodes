import { NgModule } from '@angular/core';
import { NgxTinynodesMaterialFormFieldDemoComponent } from './containers/material-form-field/material-form-field.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxEditorJSDemoMaterialModule } from './ngx-editorjs-demo.material.module';
import { CommonModule } from '@angular/common';
import { NgxTinynodesCoreModule } from '@tinynodes/ngx-tinynodes-core';
import { ReactiveFormsModule } from '@angular/forms';
import { PageStoreModule } from '../../store/pages/pages.module';
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
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { NgxTinynodesComponentsModule } from '@tinynodes/ngx-tinynodes-components';

const routes: Routes = [
  {
    path: '',
    component: NgxTinynodesMaterialFormFieldDemoComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgxTinynodesComponentsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgxJsonViewerModule,
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
  declarations: [ NgxTinynodesMaterialFormFieldDemoComponent ],
  entryComponents: [ NgxTinynodesMaterialFormFieldDemoComponent ]
})
export class NgxTinynodesMaterialFormFieldDemo {
}
