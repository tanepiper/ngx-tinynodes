import { NgModule } from '@angular/core';
import { ApplicationDataModule } from './stores/app/application.module';

/**
 * This module provides all the core features across the Tinynodes site
 * that need shared.
 *
 * This includes the `ApplicationDataModule` which provides state and data loading via
 * the `AppService`
 */
@NgModule({
  imports: [ApplicationDataModule],
  exports: [ApplicationDataModule]
})
export class NgxTinynodesCoreModule {}
