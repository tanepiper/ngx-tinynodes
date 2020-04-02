import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { NgxEditorJSService } from '@tinynodes/ngx-editorjs';
import { AppService, MenuGroup, NgxEditorJSDemo } from '@tinynodes/ngx-tinynodes-core';
import { BehaviorSubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { PagesService } from '../../../../store/pages/pages.service';
import { OutputData } from '@editorjs/editorjs';

/**
 * The Page Container component provides the main routable page for loading
 * the `ngx-editorjs-demo`
 */
@Component({
  selector: 'ngx-tinynodes-mat-form-field-demo',
  templateUrl: 'material-form-field.component.html',
  styleUrls: ['material-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxTinynodesMaterialFormFieldDemoComponent implements AfterContentInit {
  /**
   * Title of the page
   */
  @Input()
  public title = 'ngx-editorjs Material Field';
  /**
   * The holder ID for this demo
   */
  @Input()
  public holder = 'ngx-editorjs-demo';
  /**
   * Editor form group
   */
  public editorForm = this.fb.group({
    pageName: [''],
    pageTags: new FormControl([]),
    pageEditor: new FormControl([]),
  });
  /**
   * Internal onDestroy$ subject
   */
  private onDestroy$ = new Subject<boolean>();

  /**
   * Menu state for the component
   */
  private menu$ = new BehaviorSubject<MenuGroup>(undefined);
  /**
   * Autosave state
   */
  private autoSave$ = new BehaviorSubject<number>(0);

  /**
   * The constructor sets up the blocks to the initial demo data
   * @param pagesService The pages service
   * @param app The application service
   * @param editorService The Editor service
   * @param cd The change detection ref
   * @param fb The form builder
   */
  constructor(
    private readonly pagesService: PagesService,
    private app: AppService,
    private readonly editorService: NgxEditorJSService,
    private readonly cd: ChangeDetectorRef,
    private readonly fb: FormBuilder
  ) {
    this.editorService
      .lastChange({ holder: this.holder })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((hasChanged) => {
        if (hasChanged && hasChanged.blocks) {
          this.editorForm.patchValue({
            pageEditor: hasChanged.blocks,
          });
          this.cd.markForCheck();
        }
      });
  }

  /**
   * Get the current autosave state of the application
   */
  public get autosave() {
    return this.autoSave$.asObservable();
  }

  /**
   * Get the page links
   */
  public get menu() {
    return this.menu$;
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
   * Call the editor save method
   */
  public save() {
    this.editorService.save({ holder: this.holder }).subscribe();
    this.cd.markForCheck();
  }

  /**
   * Clear the editor
   * @param skipSave Optional parameter, if set to true the save method won't be called
   */
  public clear(skipSave = false) {
    this.editorForm.reset({
      pageName: '',
      pageTags: [],
    });

    this.editorService.clear({ holder: this.holder, skipSave }).pipe(take(1)).subscribe();

    this.cd.markForCheck();
  }

  /**
   * Update the component
   * @param data The data to render in the update
   * @param skipSave Optional parameter, if set to true the save method won't be called
   */
  public update(data: OutputData, skipSave = false) {
    this.editorService.update({ holder: this.holder, data, skipSave }).pipe(take(1)).subscribe();
    this.cd.markForCheck();
  }

  /**
   * Reset the editor with demo data
   */
  public reset() {
    this.app
      .getDemoData<NgxEditorJSDemo>('material-form-field-demo')
      .pipe(take(1))
      .subscribe((data) => {
        this.menu$.next(data.links);
        this.editorForm.patchValue({
          pageName: 'A test page for the Material EditorJS Component',
          pageTags: ['Angular', 'Material', 'EditorJS', 'TypeScript', 'Open Source'],
        });
        this.update({ time: Date.now(), blocks: data.blocks });
      });
  }

  /**
   * After the content has init override the blocks with blocks from the service
   */
  ngAfterContentInit() {
    this.reset();
  }
}
