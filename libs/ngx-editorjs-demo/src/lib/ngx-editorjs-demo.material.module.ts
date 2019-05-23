import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatExpansionModule,
  MatInputModule,
  MatFormFieldModule,
  MatChipsModule,
  MatBadgeModule,
  MatIconModule,
  MatListModule
} from '@angular/material';

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
    MatButtonModule
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
    MatButtonModule
  ]
})
export class NgxEditorJSDemoMaterialModule {}
