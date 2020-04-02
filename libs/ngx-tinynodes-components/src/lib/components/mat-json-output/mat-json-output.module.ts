import { NgModule } from '@angular/core';
import { NgxTinynodesMatJsonOutputComponent } from './mat-json-output.component';
import { CommonModule } from '@angular/common';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatCardModule, MatButtonModule, NgxJsonViewerModule],
  declarations: [NgxTinynodesMatJsonOutputComponent],
  exports: [NgxTinynodesMatJsonOutputComponent],
})
export class NgxTinynodesMatJsonOutputModule {}
