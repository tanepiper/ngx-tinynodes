import { NgModule } from '@angular/core';
import {
  MatGridListModule,
  MatCardModule,
  MatExpansionModule,
  MatListModule,
  MatButtonModule
} from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, MatGridListModule, MatCardModule, MatExpansionModule, MatListModule, MatButtonModule],
  exports: [CommonModule, MatGridListModule, MatCardModule, MatExpansionModule, MatListModule, MatButtonModule]
})
export class NgxTinynodesCoreMaterialModule {}
