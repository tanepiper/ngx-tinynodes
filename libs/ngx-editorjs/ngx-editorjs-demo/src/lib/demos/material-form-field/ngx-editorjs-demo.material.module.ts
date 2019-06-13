import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material';

@NgModule({
  imports: [
    MatGridListModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatBadgeModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule
  ],
  exports: [
    MatGridListModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatBadgeModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule
  ]
})
export class NgxEditorJSDemoMaterialModule {}
