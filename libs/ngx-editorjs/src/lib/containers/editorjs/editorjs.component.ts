import { FocusMonitor } from '@angular/cdk/a11y';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { Provider } from '@angular/core/src/render3/jit/compiler_facade_interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OutputData, SanitizerConfig } from '@editorjs/editorjs';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { map, takeUntil, tap, timeInterval } from 'rxjs/operators';
import { NgxEditorJSDirective } from '../../directives/ngx-editorjs.directive';
import { NgxEditorJSService } from '../../services/editorjs.service';
import { Block } from '../../types/blocks';

/**
 * The `NgxEditorJSBaseComponent` Provider for `NG_VALUE_ACCESSOR`
 */
export const EDITORJS_FORM_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgxEditorJSComponent),
  multi: true
};

/**
 * The `NgxEditorJSBaseComponent` is a fully implemented Angular component for creating EditorJS instances
 * within an Angular application or Angular Reactive Form.
 * The component provides `@Input` properties for all the configuration options of
 * a EditorJS instance and `@Output` Event Emitters to listen to changes
 * The instance also provides an Autosave feature by providing an autosave time in `ms` or `0` to disable.
 * @example
 * <ngx-editorjs holder="my-editor"></ngx-editorjs>
 */
@Component({
  selector: 'ngx-editorjs',
  templateUrl: 'editorjs.component.html',
  styleUrls: ['editorjs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EDITORJS_FORM_VALUE_ACCESSOR]
})
export class NgxEditorJSComponent implements OnDestroy, AfterContentInit, ControlValueAccessor {
  /**
   * The directive used in this component
   */
  @ViewChild('editorInstance', { read: NgxEditorJSDirective }) public readonly editorInstance: NgxEditorJSDirective;
  /**
   * Component Destroy subject, in your component `ngOnDestroy` method call `.next(true)`
   * and then `.complete()` on the `this.onDestroy$` subject
   */
  protected readonly onDestroy$ = new Subject<boolean>();
  /**
   * Boolean, If set to true the EditorJS instance gets autofocus when initialized
   */
  @Input()
  public autofocus: boolean;

  /**
   * Boolean, If set to true the toolbar will not show in the EditorJS instance
   */
  @Input()
  public hideToolbar: boolean;

  /**
   * String, the ID property of the element that the EditorJS instance will be attached to
   */
  @Input()
  public holder: string;

  /**
   * String, The type of block to set as the initial block type. This needs to match a name in the `UserPlugins` object.
   * The default value is "paragraph"
   */
  @Input()
  public initialBlock?: string;

  /**
   * Number, The minimum height of the EditorJS instance bottom after the last block
   */
  @Input()
  public minHeight: number;

  /**
   * String, The text to display as the placeholder text in the first block before content is added
   */
  @Input()
  public blockPlaceholder: string;

  /**
   * SanitizerConfig, The configuration for the HTML sanitizer
   */
  @Input()
  public sanitizer: SanitizerConfig;

  /**
   * String Array, If empty all tools available via the plugin service will be added.  If a string
   * array is set only the tools with the provided keys will be added
   */
  @Input()
  public includeTools: string[] = [];

  /**
   * Number, Used with Angular Forms this sets an autosave timer active that calls the EditorJS save
   * method. This patches the `FormControl` value with every block change and focus and blur, it also autosaves after
   * a set time
   * Set to 0 to disable or pass a value in `ms` of the autosave time
   */
  @Input()
  public autosave: number;

  /**
   * Blocks, An initial set of block data to render inside the component
   */
  @Input()
  public blocks: Block[];

  /**
   * Emits if the content from the EditorJS instance has been saved to the component value
   */
  @Output()
  public hasSaved = new EventEmitter<boolean>();

  /**
   * Emits if the component has been touched
   */
  @Output()
  public isTouched = new EventEmitter<boolean>();

  /**
   * Emits if the component is focused
   */
  @Output()
  public isFocused = new EventEmitter<boolean>();

  /**
   * Emits if the EditorJS content has changed when `save` is called
   */
  @Output()
  public hasChanged = new EventEmitter<OutputData>();

  /**
   * Emits if the EditorJS component is ready
   */
  @Output()
  public isReady = new EventEmitter<boolean>();

  /**
   * Form field value if used as a field component
   */
  protected _value: any;

  /**
   * Subscription holder for the autosave timer subscription
   */
  protected timerSubscription$: Subscription;

  /**
   * Creates an instance of the NgxEditorJSComponent which provides a Angular Forms-compatible component
   * @param editorService The EditorJS service
   * @param focusMonitor The Focus Monitor
   * @param changeDetection The Change Detection Ref
   */
  constructor(
    protected readonly editorService: NgxEditorJSService,
    protected readonly focusMonitor: FocusMonitor,
    protected readonly changeDetection: ChangeDetectorRef
  ) {}

  /**
   * Internal method to return a new timer for the autosave support
   * @param time Time to do with autosave
   * @param timeStart When to trigger the first autosave, default is 0 which triggers an immediate save
   */
  protected getTimer(time: number, timeStart = 0): Observable<number> {
    return timer(timeStart, time).pipe(
      timeInterval(),
      map(interval => interval.interval)
    );
  }

  /**
   * Angular Form onTouch method, this is a default method that updates
   * the touch status on the component
   * @param event The mouse event from the touch
   */
  public onTouch (event?: MouseEvent): void {
    this.isTouched.emit(true);
  };

  /**
   * Angular Form onChange method, this is a default method that updates the
   * editor instance with blocks on change
   * @param data The data to write
   */
  public onChange (data: OutputData): void  {
    this.writeValue(data);
  };


  /**
   * Angular Forms value writer, updates the editor
   * @param data The data to write
   */
  public writeValue(data: OutputData): void {
    this._value = data;
    this.editorService.update({ holder: this.holder, data });
    this.changeDetection.markForCheck();
  }

  /**
   * Angular Forms registerOnChange
   */
  public registerOnChange(fn: (change: OutputData) => void): void {
    this.onChange = fn;
  }

  /**
   * Angular Forms registerOnTouched
   */
  public registerOnTouched(fn: (event?: MouseEvent) => void): void {
    this.onTouch = fn;
  }

  /**
   * Returns a focus monitor observable with the focus value.
   * The side effect of this monitor is to update the saved state and
   * start any autosave timers
   * @param element The element to monitor
   * @param checkChildren If the children should be checked
   */
  protected getFocusMonitor(element: HTMLElement, checkChildren = true): Observable<boolean> {
    this.hasSaved.emit(false);

    return this.focusMonitor.monitor(element, checkChildren).pipe(
      map(origin => !!origin),
      tap(focused => {
        if (focused) {
          this.isFocused.emit(true);
          if (this.autosave > 0) {
            this.timerSubscription$ = this.getTimer(this.autosave, 0)
              .pipe(tap(() => this.editorService.save({ holder: this.holder })))
              .subscribe();
          }
        } else {
          if (this.timerSubscription$) {
            this.timerSubscription$.unsubscribe();
          }
          this.isFocused.emit(false);
        }
      })
    );
  }

  /**
   * Sets up the service subscriptions to @Output value
   */
  protected setupServiceSubscriptions() {
    this.editorService
      .isReady({ holder: this.holder })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(isReady => {
        this.isReady.emit(isReady);
      });

    this.editorService
      .hasChanged({ holder: this.holder })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(change => {
        this.hasChanged.emit(change);
      });

    this.editorService
      .hasSaved({ holder: this.holder })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(saved => {
        this.hasSaved.next(saved);
      });
  }

  /**
   * Set up the focus monitor and subscriptions to editor service observables
   */
  ngAfterContentInit(): void {
    this.setupServiceSubscriptions();
    this.getFocusMonitor(this.editorInstance.element)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.onTouch();
      });
  }

  /**
   * Called when the component is destroyed, the focus monitor is destroyed
   * as well as the editor service, also the onDestroy$ subject is completed
   */
  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.editorInstance.element);
    if (this.timerSubscription$ && !this.timerSubscription$.closed) {
      this.timerSubscription$.unsubscribe();
    }
    if (!this.onDestroy$.closed) {
      this.onDestroy$.next(true);
      this.onDestroy$.complete();
    }
    this.hasChanged.complete();
    this.hasSaved.complete();
    this.isFocused.complete();
    this.isTouched.complete();
    this.isReady.complete();
    this.editorService.destroy();
  }
}
