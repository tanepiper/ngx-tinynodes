import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatFormFieldModule,
  MatMenuModule,
  MatButtonModule,
  MatDividerModule
} from '@angular/material';

@NgModule({
  imports: [MatInputModule, MatFormFieldModule, MatMenuModule, MatButtonModule, MatDividerModule],
  exports: [MatInputModule, MatFormFieldModule, MatMenuModule, MatButtonModule, MatDividerModule]
})
export class NgxEditorJSMaterialModule {}
