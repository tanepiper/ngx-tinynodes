import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxHidableHeaderDirective } from './directives/ngx-hidable-header/ngx-hidable-header.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [NgxHidableHeaderDirective],
  exports: [NgxHidableHeaderDirective]
})
export class NgxHidableHeaderModule {}
