import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Block, NgxEditorJSService } from '@tinynodes/ngx-editorjs/src';
import { AppService } from '@tinynodes/ngx-tinynodes-core/src';
import { NgxEditorJSDemo } from '@tinynodes/ngx-tinynodes-core/src/lib/stores/app/application.model';
import { MenuGroup } from 'apps/ngx-tinynodes/src/app/core/types/app';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, take, takeUntil } from 'rxjs/operators';
import { Page } from '../../store/pages/pages.models';
import { PagesService } from '../../store/pages/pages.service';

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
   * Title of the page
   */
  public title = 'ngx-editorjs Material Field';
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
   * Autosave state
   */
  private autoSave$ = new BehaviorSubject<number>(0);

  /**
   * Is saved state
   */
  private isSaved$ = new BehaviorSubject<boolean>(true);

  /**
   * Get `isSaved` state
   */
  public get isSaved(): Observable<boolean> {
    return this.isSaved$.asObservable();
  }

  /**
   * Set the current saved state
   * @param isSaved The current saved state
   */
  public setIsSaved(isSaved: boolean) {
    this.isSaved$.next(isSaved);
  }

  /**
   * Enable autosave, set the value from the autosaveTime
   * @param autosaveTime Time to set for autosave
   */
  public enableAutosave(autosaveTime: number) {
    this.autoSave$.next(autosaveTime);
  }

  /**
   * Disable autosave
   */
  public disableAutosave() {
    this.autoSave$.next(0);
  }

  /**
   * Get the current autosave value
   */
  public get autosave() {
    return this.autoSave$.asObservable();
  }

  /**
   * The constructor sets up the blocks to the initial demo data
   * @param pagesService The pages service
   * @param app The application service
   * @param editor The Editor service
   * @param cd The change detection ref
   * @param fb The form builder
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
        this.cd.markForCheck();
      });
  }

  /**
   * Editor form group
   */
  public editorForm = this.fb.group({
    pageName: [''],
    pageTags: new FormControl([]),
    pageEditor: new FormControl([])
  });

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
   * Get the blocks for the container
   */
  get blocks(): Observable<Block[]> {
    return this.blocks$;
  }

  /**
   * Call the editor save method
   */
  public save() {
    this.editor.save({ holder: this.holder });
    this.setIsSaved(true);
    this.cd.markForCheck();
  }

  /**
   * Clear the editor
   */
  public clear() {
    this.editor.clear({ holder: this.holder });
    this.setIsSaved(true);
    this.cd.markForCheck();
  }

  /**
   * Reset the editor with demo data
   */
  public reset() {
    this.app
      .getDemoData<NgxEditorJSDemo>('ngx-editorjs-demo')
      .pipe(take(1))
      .subscribe((data: NgxEditorJSDemo) => {
        const blocks = [
          ...data.blocks,
          {
            type: 'header',
            data: {
              text: 'Material Form Component',
              level: 1
            }
          },
          {
            type: 'paragraph',
            data: {
              text:
                'This component is provided as a Material form component.  Here is the configuration for this field on this page:'
            }
          },
          {
            type: 'code',
            data: {
              code: `<form [formGroup]="editorForm">
  <mat-form-field>
    <ngx-editorjs-mat-field
      [id]="holder"
      [holder]="holder"
      formCotrolName="pageEditor"
      [blocks]="blocks | async"
      placeholder="EditorJS for {{ editorForm.value.pageName || 'Page Name' }}">
    </ngx-editorjs-mat-field>
  </mat-form-field>
</form>`
            }
          },
          {
            type: 'paragraph',
            data: {
              text: 'When you save the form, you can see the output below of the form instance values'
            }
          }
        ];
        this.menu$.next(data.links);
        this.editor.update({ holder: this.holder, blocks });
        this.setIsSaved(true);
        this.cd.markForCheck();
      });
  }

  /**
   * After the content has init overide the blocks with blocks from the service
   */
  ngAfterContentInit() {
    this.reset();
  }
}
