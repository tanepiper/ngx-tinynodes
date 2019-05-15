import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuGroup } from 'apps/ngx-tinynodes/src/app/core/types/app';

@Component({
  selector: 'ngx-editorjs-page-info',
  templateUrl: 'page-info.component.html',
  styleUrls: ['page-info.component.scss']
})
export class PageInfoComponent {
  /**
   * If the panel is open or not
   */
  private panelOpen$ = new BehaviorSubject<boolean>(true);

  @Input()
  public links: MenuGroup;

  /**
   * Toggles the panel state
   */
  public togglePanel(value?: boolean) {
    this.panelOpen$.next(typeof value !== 'undefined' ? value : !this.panelOpen$.value);
  }

  get panelOpen() {
    return this.panelOpen$.asObservable();
  }
}
