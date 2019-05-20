import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MenuGroup, MenuItem } from '@tinynodes/ngx-tinynodes-core';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'ngx-editorjs-demo-info',
  templateUrl: 'demo-info.component.html',
  styleUrls: ['demo-info.component.scss']
})
export class NgxEditorJSDemoInfoComponent implements OnInit {
  /**
   * If the panel is open or not
   */
  private panelOpen$ = new BehaviorSubject<boolean>(true);

  /**
   * Sets the panel open state
   */
  @Input()
  panelOpen: boolean;

  /**
   * The menu group for the component
   */
  @Input()
  menu: MenuGroup;

  /**
   * The title of the component
   */
  @Input()
  title: string;

  @Input()
  body: TemplateRef<any>;

  ngOnInit() {
    if (typeof this.panelOpen !== 'undefined') {
      this.panelOpen$.next(this.panelOpen);
    }
  }

  /**
   * Gets if the panel is open or not
   */
  public get isPanelOpen(): Observable<boolean> {
    return this.panelOpen$.asObservable();
  }

  /**
   * Toggles the panel state
   */
  public togglePanel(value: boolean): void {
    this.panelOpen$.next(value);
  }
}
