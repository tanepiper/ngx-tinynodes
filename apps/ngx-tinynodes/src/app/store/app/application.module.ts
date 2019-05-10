import { NgModule } from '@angular/core';
import { ApplicationQuery } from './application.query';
import { ApplicationService } from './application.service';
import { ApplicationStore } from './application.store';

@NgModule({
  providers: [ApplicationService, ApplicationQuery, ApplicationStore]
})
export class ApplicationDataModule {}
