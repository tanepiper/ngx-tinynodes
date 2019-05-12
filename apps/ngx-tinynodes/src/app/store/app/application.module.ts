import { NgModule } from '@angular/core';
import { ApplicationQuery } from './application.query';
import { AppService } from './application.service';
import { ApplicationStore } from './application.store';

@NgModule({
  providers: [AppService, ApplicationQuery, ApplicationStore]
})
export class ApplicationDataModule {}
