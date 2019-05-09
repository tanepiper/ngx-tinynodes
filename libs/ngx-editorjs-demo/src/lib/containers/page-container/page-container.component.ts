import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../store/pages/pages.models';
import { PagesService } from '../../store/pages/pages.service';

@Component({
  selector: 'ngx-page-container',
  templateUrl: 'page-container.component.html',
  styleUrls: ['page-container.component.scss']
})
export class PageContainerComponent {
  constructor(private readonly pagesService: PagesService) {}

  get pages(): Observable<Page[]> {
    return this.pagesService.pages;
  }
}
