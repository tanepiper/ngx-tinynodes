import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Page } from '../../store/pages/pages.models';

@Component({
  selector: 'ngx-editorjs-page-list',
  templateUrl: 'page-list.component.html',
  styleUrls: ['page-list.component.scss']
})
export class PageListComponent {
  @Input()
  pages: Page[];

  @Output()
  addPage = new EventEmitter<void>();

  public page() {
    console.log('called');
    this.addPage.next();
  }

  public trackPages(index: number, page: Page) {
    return page.id;
  }
}
