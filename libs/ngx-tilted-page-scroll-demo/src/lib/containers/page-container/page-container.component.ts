import { Component } from '@angular/core';
import { Panel } from '@tinynodes/ngx-tilted-scroll/src';
import { BehaviorSubject } from 'rxjs';
import { MenuGroup } from '@tinynodes/ngx-tinynodes-core/src';
import { filter, pluck } from 'rxjs/operators';

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

  /**
   * If the panel is open or not
   */
  private panelOpen$ = new BehaviorSubject<boolean>(true);

  /**
   * Links for the page
   */
  private menu$ = new BehaviorSubject<MenuGroup>(undefined);

  /**
   * Gets if the panel is open or not
   */
  public get panelOpen() {
    return this.panelOpen$.asObservable();
  }

  /**
   * Toggles the panel state
   */
  public togglePanel(value: boolean) {
    this.panelOpen$.next(value);
  }

  /**
   * Get the page links
   */
  public get links() {
    return this.menu$.pipe(
      filter(data => typeof data !== 'undefined'),
      pluck('items')
    );
  }
}
