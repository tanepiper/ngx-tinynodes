import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Block, NgxEditorJSService } from '@tinynodes/ngx-editorjs/src';
import { AppService } from '@tinynodes/ngx-tinynodes-core/src';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';
import { Page } from '../../store/pages/pages.models';
import { PagesService } from '../../store/pages/pages.service';

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
   * The constructor sets up the blocks to the initial demo data
   * @param pagesService The pages service
   * @param app The application service
   * @param editor The Editor service
   * @param cd The change detection ref
   */
  constructor(
    private readonly pagesService: PagesService,
    private app: AppService,
    private readonly editor: NgxEditorJSService,
    private readonly cd: ChangeDetectorRef
  ) {
    // this.blocks$ = this.app.getDemoData('ngx-editorjs-demo');
  }

  /**
   * Get the blocks for the page
   */
  public get blocks() {
    return this.blocks$;
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
    this.editor.save(this.holder);
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
    this.app.getDemoData('ngx-editorjs-demo').subscribe((blocks: Block[]) => {
      this.editor.update(this.holder, blocks);
    });
  }

  /**
   * Get the blocks data as formatted JSON
   */
  public get asJSON() {
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
    this.blocks$ = this.editor.getBlocks(this.holder).pipe(
      distinctUntilChanged(),
      takeUntil(this.onDestroy$)
    );
    this.reset();
  }
}
