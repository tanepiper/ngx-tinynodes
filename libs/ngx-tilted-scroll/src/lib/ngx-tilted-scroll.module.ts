import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TiltedScrollPanelComponent } from './components/tilted-scroll-panel/tilted-scroll-panel.component';
import { TiltedScrollContainerComponent } from './containers/tilted-scroll-container/tilted-scroll-container.component';

@NgModule({
  imports: [CommonModule, ScrollingModule],
  declarations: [TiltedScrollPanelComponent, TiltedScrollContainerComponent],
  exports: [TiltedScrollPanelComponent, TiltedScrollContainerComponent]
})
export class NgxTiltedPageScrollModule {}
