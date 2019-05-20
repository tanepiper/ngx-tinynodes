import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Block, NgxEditorJSService } from '@tinynodes/ngx-editorjs/src';
import { AppService } from '@tinynodes/ngx-tinynodes-core/src';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil, tap, pluck, filter, take } from 'rxjs/operators';
import { Page } from '../../store/pages/pages.models';
import { PagesService } from '../../store/pages/pages.service';
import { MenuGroup } from 'apps/ngx-tinynodes/src/app/core/types/app';
import { NgxEditorJSDemo } from '@tinynodes/ngx-tinynodes-core/src/lib/stores/app/application.model';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgxEditorJSFormComponent } from '@tinynodes/ngx-editorjs/src/lib/containers/editorjs-form/editorjs-form.component';

/**
 * The Page Container component provides the main routable page for loading
 * the `ngx-editorjs-demo`
 */
@Component({
  selector: 'ngx-form-container',
  templateUrl: 'form-container.component.html',
  styleUrls: ['form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormContainerComponent implements AfterContentInit {
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
    private readonly cd: ChangeDetectorRef,
    private readonly fb: FormBuilder
  ) {
    this.editor
      .getBlocks(this.holder)
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.onDestroy$)
      )
      .subscribe(blocks => {
        this.editorForm.patchValue({
          pageEditor: blocks
        });
      });
  }

  public editorForm = this.fb.group({
    pageName: [''],
    pageEditor: new FormControl()
  });

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
    return this.pagesService.pages;
  }

  /**
   * Call the editor save method
   */
  public save() {
    this.editor.save({ holder: this.holder });
  }

  /**
   * Clear the editor
   */
  public clear() {
    this.editor.clear({ holder: this.holder });
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
        this.editor.update({ holder: this.holder, blocks: data.blocks });
      });
  }

  /**
   * After the content has init overide the blocks with blocks from the service
   */
  ngAfterContentInit() {
    this.reset();

    this.editorForm.valueChanges.subscribe(changes => console.log('form changes', changes));
  }
}
