import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, MatGridListModule, MatCardModule, MatExpansionModule, MatListModule, MatButtonModule],
  exports: [CommonModule, MatGridListModule, MatCardModule, MatExpansionModule, MatListModule, MatButtonModule]
})
export class NgxTinynodesCoreMaterialModule {}
