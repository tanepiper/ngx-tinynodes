import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Block, NgxEditorJSComponent, NgxEditorJSService } from '@tinynodes/ngx-editorjs';
import { AppService, MenuGroup, NgxEditorJSDemo } from '@tinynodes/ngx-tinynodes-core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, pluck, take, takeUntil, tap } from 'rxjs/operators';
import { Page } from '../../store/pages/pages.models';
import { PagesService } from '../../store/pages/pages.service';
import { OutputData } from '@editorjs/editorjs';

/**
 * The Page Container provided the basic demo for the `ngx-editorjs` component
 */
@Component({
  selector: 'ngx-page-container',
  templateUrl: 'page-container.component.html',
  styleUrls: ['page-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageContainerComponent implements AfterContentInit {
  /**
   * Internal onDestroy$ subject
   */
  private readonly onDestroy$ = new Subject<boolean>();

  /**
   * The holder ID for this demo
   */
  public holder = 'ngx-editorjs-demo';

  /**
   * Links for the page
   */
  private menu$ = new BehaviorSubject<MenuGroup>(undefined);

  @ViewChild('ngxEditorJS', { read: NgxEditorJSComponent, static: true }) ngxEditorJS: NgxEditorJSComponent;

  /**
   * The constructor sets up the blocks to the initial demo data
   * @param pagesService The pages service
   * @param app The application service
   * @param editorService The Editor service
   * @param cd The change detection ref
   */
  constructor(
    private readonly pagesService: PagesService,
    private readonly app: AppService,
    private readonly editorService: NgxEditorJSService,
    private readonly cd: ChangeDetectorRef
  ) {}

  /**
   * Get the blocks from the last change
   */
  public get blocks() {
    return this.editorService.hasChanged({ holder: this.holder }).pipe(
      pluck<OutputData, Block[]>('blocks'),
      takeUntil(this.onDestroy$)
    );
  }

  /**
   * Get the page links
   */
  public get menu() {
    return this.menu$;
  }

  /**
   * Get a list of pages
   */
  get pages(): Observable<Page[]> {
    return this.pagesService.pages;
  }

  /**
   * Call the editor save method
   */
  public save() {
    this.editorService.save({ holder: this.holder });
  }

  /**
   * Clear the editor
   */
  public clear() {
    this.editorService.clear({ holder: this.holder });
  }

  /**
   * Reset the editor with demo data
   */
  public reset() {
    this.app
      .getDemoData<NgxEditorJSDemo>('ngx-editorjs-demo')
      .pipe(take(1))
      .subscribe((data: NgxEditorJSDemo) => {
        this.menu$.next(data.links);
        this.editorService.update({ holder: this.holder, data: { blocks: data.blocks } });
      });
  }

  /**
   * Get the blocks data as formatted JSON
   */
  public get asJSON() {
    return this.blocks.pipe(
      take(1),
      map(blocks => {
        return JSON.stringify(blocks, null, 4);
      }),
      tap(() => this.cd.markForCheck())
    );
  }

  /**
   * After the content has init override the blocks with blocks from the service
   */
  ngAfterContentInit() {
    this.reset();
  }
}
