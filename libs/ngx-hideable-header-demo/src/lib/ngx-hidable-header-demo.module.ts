import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxHidableHeaderDemoComponent } from './ngx-hidable-header-demo/ngx-hidable-header-demo.component';
import { NgxHidableHeaderModule } from '@tinynodes/ngx-hidable-header';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatCheckboxModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule, MatSelectModule,
  MatToolbarModule
} from '@angular/material';
import { NgxTinynodesCoreModule } from '@tinynodes/ngx-tinynodes-core';

export const routes: Routes = [{
  path: 'ngx-hidable-header-demo',
  component: NgxHidableHeaderDemoComponent
}]


@NgModule({
  declarations: [NgxHidableHeaderDemoComponent],
  imports: [
    CommonModule,
    NgxHidableHeaderModule,
    NgxTinynodesCoreModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatDividerModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,

    RouterModule.forChild(routes)
  ],
  exports: [RouterModule, NgxHidableHeaderModule],
  entryComponents: [NgxHidableHeaderDemoComponent]
})
export class NgxHidableHeaderDemoModule {
}
