import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxHidableHeaderDemoComponent } from './ngx-hidable-header-demo/ngx-hidable-header-demo.component';
import { HideableHeaderModule } from 'ngx-hideable-header';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [{
  path: 'ngx-hidable-header-demo',
  component: NgxHidableHeaderDemoComponent
}]


@NgModule({
  declarations: [NgxHidableHeaderDemoComponent],
  imports: [
    CommonModule,
    HideableHeaderModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule, HideableHeaderModule],
  entryComponents: [NgxHidableHeaderDemoComponent]
})
export class NgxHidableHeaderDemoModule {
}
