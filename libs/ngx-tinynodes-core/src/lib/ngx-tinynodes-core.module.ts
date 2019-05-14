import { NgModule } from '@angular/core';
import { ApplicationDataModule } from './stores/app/application.module';

@NgModule({
  imports: [ApplicationDataModule],
  exports: [ApplicationDataModule]
})
export class NgxTinynodesCoreModule {}
