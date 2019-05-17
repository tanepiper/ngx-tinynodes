import { Component } from '@angular/core';
import { Panel } from '@tinynodes/ngx-tilted-scroll/src';

@Component({
  selector: 'ngx-tiled-page-scroll-demo-page',
  templateUrl: 'page-container.component.html',
  styleUrls: ['page-container.component.scss']
})
export class PageContainerComponent {
  public panels: Panel[] = [
    {
      id: 'panel-1',
      class: 'panel-1',
      type: 'default',
      data: {
        title: 'This is Panel 1',
        content: 'Panel 1 Content'
      }
    },
    {
      id: 'panel-2',
      class: 'panel-2',
      type: 'default',
      data: {
        title: 'This is Panel 2',
        content: 'Panel 2 Content'
      }
    },
    {
      id: 'panel-3',
      class: 'panel-3',
      type: 'default',
      data: {
        title: 'This is Panel 3',
        content: 'Panel 3 Content'
      }
    },
    {
      id: 'panel-4',
      class: 'panel-4',
      type: 'default',
      data: {
        title: 'This is Panel 4',
        content: 'Panel 4 Content'
      }
    },
    {
      id: 'panel-5',
      class: 'panel-5',
      type: 'default',
      data: {
        title: 'This is Panel 5',
        content: 'Panel 5 Content'
      }
    }
  ];
}
