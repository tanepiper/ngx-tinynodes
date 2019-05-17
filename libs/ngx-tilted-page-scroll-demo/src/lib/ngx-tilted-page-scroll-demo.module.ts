import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxTiltedPageScrollModule } from '@tinynodes/ngx-tilted-scroll';
import { PageContainerComponent } from '../containers/page-container/page-container.component';
import { NgxTiltedPageScrollDemoRoutesModule } from './routes.module';

@NgModule({
  imports: [CommonModule, NgxTiltedPageScrollDemoRoutesModule, NgxTiltedPageScrollModule],
  declarations: [PageContainerComponent],
  exports: [PageContainerComponent]
})
export class NgxTiltedPageScrollDemoModule {}
