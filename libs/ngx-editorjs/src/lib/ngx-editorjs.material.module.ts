import { NgModule } from '@angular/core';
import { MatInputModule, MatFormFieldModule, MatMenuModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [MatInputModule, MatFormFieldModule, MatMenuModule, MatButtonModule],
  exports: [MatInputModule, MatFormFieldModule, MatMenuModule, MatButtonModule]
})
export class NgxEditorJSMaterialModule {}
