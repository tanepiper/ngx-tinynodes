import { NgModule } from '@angular/core';
import { ApplicationDataModule } from './stores/app/application.module';
import { NgxEditorJSDemoInfoComponent } from './components/demo-info/demo-info.component';
import { NgxTinynodesCoreMaterialModule } from './ngx-tinynodes-core-material.module';
/**
 * This module provides all the core features across the Tinynodes site
 * that need shared.
 *
 * This includes the `ApplicationDataModule` which provides state and data loading via
 * the `AppService`
 */
@NgModule({
  imports: [ApplicationDataModule, NgxTinynodesCoreMaterialModule],
  declarations: [NgxEditorJSDemoInfoComponent],
  exports: [ApplicationDataModule, NgxEditorJSDemoInfoComponent, NgxTinynodesCoreMaterialModule]
})
export class NgxTinynodesCoreModule {}
