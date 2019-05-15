import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Page } from '../../store/pages/pages.models';
import { PagesService } from '../../store/pages/pages.service';
import { Block, NgxEditorJSService } from '@tinynodes/ngx-editorjs/src';
import { AppService } from '@tinynodes/ngx-tinynodes-core/src';
import { takeUntil, filter, withLatestFrom, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-page-container',
  templateUrl: 'page-container.component.html',
  styleUrls: ['page-container.component.scss']
})
export class PageContainerComponent {
  private onDestroy$ = new Subject<boolean>();

  public holder = 'ngx-editorjs-demo';

  constructor(
    private readonly pagesService: PagesService,
    private app: AppService,
    private readonly editor: NgxEditorJSService
  ) {
    this.editor
      .isReady(this.holder)
      .pipe(
        filter(isReady => {
          return isReady;
        }),
        withLatestFrom(this.blocks),
        takeUntil(this.onDestroy$)
      )
      .subscribe(([isReady, blocks]) => {
        console.log(blocks);
        this.editor.update(this.holder, blocks);
      });
    // this.editor
    //   .getBlocks(this.holder)
    //   .pipe(takeUntil(this.onDestroy$))
    //   .subscribe(blocks => {});
  }

  get blocks() {
    return this.app.getDemoData('ngx-editorjs-demo');
  }

  get pages(): Observable<Page[]> {
    return this.pagesService.pages;
  }

  public save() {
    this.editor.save(this.holder);
  }
}
