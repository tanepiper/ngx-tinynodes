import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Block, NgxEditorJSService } from '@tinynodes/ngx-editorjs';
import { AppService, MenuGroup, NgxEditorJSDemo } from '@tinynodes/ngx-tinynodes-core';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, pluck, take, takeUntil } from 'rxjs/operators';
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
  changeDetection: ChangeDetectionStrategy.OnPush
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
    pageEditor: new FormControl([])
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
      .pipe(
        distinctUntilChanged((a, b) => (b && b.time && b.time === 0) || (a && a.time && a.time === b.time)),
        filter(hasChanged => typeof hasChanged !== 'undefined'),
        takeUntil(this.onDestroy$)
      )
      .subscribe(hasChanged => {
        if (hasChanged && hasChanged.blocks) {
          this.editorForm.patchValue({
            pageEditor: hasChanged.blocks
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

  get hasSaved() {
    return this.editorService.hasSaved({ holder: this.holder });
  }

  public get blocks() {
    return this.editorService.lastChange({ holder: this.holder }).pipe(
      filter(data => {
        if (typeof data === 'undefined') {
          return false;
        }
        return data.time !== 0;
      }),
      pluck<OutputData, Block[]>('blocks'),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      takeUntil(this.onDestroy$)
    );
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
   */
  public clear() {
    this.editorService
      .clear({ holder: this.holder })
      .pipe(take(1))
      .subscribe();
    this.cd.markForCheck();
  }

  /**
   * Update the component
   * @param data
   */
  public update(data: OutputData) {
    this.editorService
      .update({ holder: this.holder, data })
      .pipe(take(1))
      .subscribe();
    this.cd.markForCheck();
  }

  /**
   * Reset the editor with demo data
   */
  public reset() {
    this.app
      .getDemoData<NgxEditorJSDemo>('material-form-field-demo')
      .pipe(take(1))
      .subscribe(data => {
        this.menu$.next(data.links);
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
