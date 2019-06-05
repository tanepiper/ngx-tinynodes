import { NgModule } from '@angular/core';
import { NgxTinynodesMatJsonOutputComponent } from './mat-json-output.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
  imports: [CommonModule, MatCardModule, MatButtonModule, NgxJsonViewerModule],
  declarations: [ NgxTinynodesMatJsonOutputComponent ],
  exports: [ NgxTinynodesMatJsonOutputComponent ]
})
export class NgxTinynodesMatJsonOutputModule {
}
