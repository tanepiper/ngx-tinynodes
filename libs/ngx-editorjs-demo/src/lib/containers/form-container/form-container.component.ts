import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Block, NgxEditorJSService, NgxEditorJSMatFieldComponent } from '@tinynodes/ngx-editorjs';
import { AppService, MenuGroup, NgxEditorJSDemo } from '@tinynodes/ngx-tinynodes-core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { pluck, take, takeUntil, tap, distinctUntilChanged, filter } from 'rxjs/operators';
import { Page } from '../../store/pages/pages.models';
import { PagesService } from '../../store/pages/pages.service';
import { OutputData } from '@editorjs/editorjs';

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
  @ViewChild('ngxEditorJS', { read: NgxEditorJSMatFieldComponent })
  public readonly ngxEditorJS: NgxEditorJSMatFieldComponent;

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
   * Panel open state
   */
  private panelOpen$ = new BehaviorSubject<boolean>(true);

  /**
   * Menu state for the component
   */
  private menu$ = new BehaviorSubject<MenuGroup>(undefined);

  /**
   * Autosave state
   */
  private autoSave$ = new BehaviorSubject<number>(0);

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
      .hasChanged({ holder: this.holder })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(hasChanged => {
        this.editorForm.patchValue({
          pageEditor: hasChanged.blocks
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

  get hasSaved() {
    return this.editorService.hasSaved({ holder: this.holder });
  }

  public get blocks() {
    return this.editorService.hasChanged({ holder: this.holder }).pipe(
      filter(data => {
        if (typeof data === 'undefined') {
          return false;
        }
        if (data.time === 0) {
          return false;
        }
        return true;
      }),
      pluck<OutputData, Block[]>('blocks'),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      takeUntil(this.onDestroy$)
    );
  }

  /**
   * Call the editor save method
   */
  public save() {
    this.editorService.save({ holder: this.holder });
    this.cd.markForCheck();
  }

  /**
   * Clear the editor
   */
  public clear() {
    this.editorService.clear({ holder: this.holder });
    this.cd.markForCheck();
  }

  /**
   * Update the component
   * @param blocks
   */
  public update(data: OutputData, triggerUpdate = true) {
    console.log('update', data);
    this.editorService.update({ holder: this.holder, data }, triggerUpdate);
    this.cd.markForCheck();
  }

  /**
   * Reset the editor with demo data
   */
  public reset() {
    this.app
      .getDemoData<NgxEditorJSDemo>('ngx-editorjs-demo')
      .pipe(take(1))
      .subscribe(data => {
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
        this.update({ blocks }, false);
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
