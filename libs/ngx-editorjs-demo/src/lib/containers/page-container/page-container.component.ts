import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Block, NgxEditorJSService } from '@tinynodes/ngx-editorjs/src';
import { AppService } from '@tinynodes/ngx-tinynodes-core/src';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  takeUntil,
  tap,
  pluck,
  filter,
  take,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import { Page } from '../../store/pages/pages.models';
import { PagesService } from '../../store/pages/pages.service';
import { MenuGroup } from 'apps/ngx-tinynodes/src/app/core/types/app';
import { NgxEditorJSDemo } from '@tinynodes/ngx-tinynodes-core/src/lib/stores/app/application.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ID } from '@datorama/akita';

/**
 * The Page Container component provides the main routable page for loading
 * the `ngx-editorjs-demo`
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
  private onDestroy$ = new Subject<boolean>();

  /**
   * The holder ID for this demo
   */
  public holder = 'ngx-editorjs-demo';

  /**
   * The blocks on the page
   */
  private blocks$: Observable<Block[]>;

  /**
   * If the panel is open or not
   */
  private panelOpen$ = new BehaviorSubject<boolean>(true);

  /**
   * Links for the page
   */
  private menu$ = new BehaviorSubject<MenuGroup>(undefined);

  /**
   * Pages available in the apps
   */
  private pages$ = new BehaviorSubject<Page[]>([]);

  /**
   * Gets if the panel is open or not
   */
  public get panelOpen() {
    return this.panelOpen$.asObservable();
  }

  /**
   * The constructor sets up the blocks to the initial demo data
   * @param pagesService The pages service
   * @param app The application service
   * @param editor The Editor service
   * @param cd The change detection ref
   */
  constructor(
    private readonly pagesService: PagesService,
    private readonly app: AppService,
    private readonly editor: NgxEditorJSService,
    private readonly cd: ChangeDetectorRef,
    private readonly route: ActivatedRoute
  ) {
    this.editor
      .getBlocks(this.holder)
      .pipe(
        distinctUntilChanged(),
        withLatestFrom(this.route.paramMap),
        takeUntil(this.onDestroy$)
      )
      .subscribe(([blocks, params]) => {
        this.pagesService.setBlocks(params.get('id'), blocks as any);
      });

    this.pagesService.pages
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.onDestroy$)
      )
      .subscribe(pages => this.pages$.next(pages));

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.pagesService.getPage(params.get('id'))),
        filter(page => typeof page !== 'undefined')
      )
      .subscribe(page => {
        this.editor.update(this.holder, page.blocks);
      });
  }

  /**
   * Get the blocks for the page
   */
  public get blocks() {
    return this.blocks$;
  }

  public addPage() {
    this.pagesService.add();
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

  /**
   * Get a list of pages
   */
  get pages(): Observable<Page[]> {
    return this.pages$.asObservable();
  }

  /**
   * Call the editor save method
   */
  public save() {
    this.editor.save(this.holder);
    this.editor
      .getBlocks(this.holder)
      .pipe(
        withLatestFrom(this.route.paramMap),
        take(1)
      )
      .subscribe(([blocks, params]) => {
        this.pagesService.upsert({
          id: params.get('id') as ID,
          pageTitle: '',
          pageTags: [],
          blocks: blocks as any
        });
      });
  }

  /**
   * Clear the editor
   */
  public clear() {
    this.editor.clear(this.holder);
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
        this.editor.update(this.holder, data.blocks);
      });
  }

  /**
   * Get the blocks data as formatted JSON
   */
  public get asJSON() {
    if (!this.blocks) {
      return;
    }
    return this.blocks.pipe(
      map(blocks => {
        return JSON.stringify(blocks, null, 4);
      }),
      tap(() => this.cd.markForCheck())
    );
  }

  /**
   * After the content has init overide the blocks with blocks from the service
   */
  ngAfterContentInit() {
    this.reset();
  }
}
