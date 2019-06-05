import { NgModule } from '@angular/core';
import { NgxTinynodesMatTagInputModule } from './components/mat-tag-input/mat-tag-input.module';
import { NgxTinynodesMatJsonOutputModule } from './components/mat-json-output/mat-json-output.module';

@NgModule({
  imports: [ NgxTinynodesMatTagInputModule, NgxTinynodesMatJsonOutputModule ],
  exports: [ NgxTinynodesMatTagInputModule, NgxTinynodesMatJsonOutputModule ]
})
export class NgxTinynodesComponentsModule {
}
