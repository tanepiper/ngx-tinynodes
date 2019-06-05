import { NgModule } from '@angular/core';
import { NgxTinynodesMatTagInputComponent } from './mat-tag-input.component';
import { MatChipsModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [FormsModule,CommonModule, MatChipsModule, MatIconModule],
  declarations: [ NgxTinynodesMatTagInputComponent ],
  exports: [ NgxTinynodesMatTagInputComponent ]
})
export class NgxTinynodesMatTagInputModule {
}
