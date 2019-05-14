import { NgModule } from '@angular/core';
import { ApplicationQuery } from './application.query';
import { AppService } from './application.service';
import { ApplicationStore } from './application.store';

/**
 * This module provide the Application state and helper functions that
 * are used across the Tinynodes site
 */
@NgModule({
  providers: [AppService, ApplicationQuery, ApplicationStore]
})
export class ApplicationDataModule {}
