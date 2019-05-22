import { FocusMonitor } from '@angular/cdk/a11y';
import { AfterContentInit, Component, EventEmitter, forwardRef, Input, OnDestroy, Output } from '@angular/core';
import { Provider } from '@angular/core/src/render3/jit/compiler_facade_interface';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SanitizerConfig } from '@editorjs/editorjs';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { map, tap, timeInterval } from 'rxjs/operators';
import { NgxEditorJSService } from '../../services/editorjs.service';
import { Block } from '../../types/blocks';

/**
 * The `NgxEditorJSBaseComponent` Provider for `NG_VALUE_ACCESSOR`
 */
export const EDITORJS_FORM_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgxEditorJSBaseComponent),
  multi: true
};

/**
 * The `NgxEditorJSBaseComponent` is a fully implemented Angular component for creating `EditorJS` instances
 * within an Angular application or Angular Reactive Form.
 * The component provides `@Input` properties for all the configuration options of
 * a `EditorJS` instance.
 * The instance also provides an Autosave feature by providing an autosave time in `ms` or `0` to disable.
 */
@Component({
  template: '',
  providers: [EDITORJS_FORM_VALUE_ACCESSOR]
})
export class NgxEditorJSBaseComponent implements OnDestroy, AfterContentInit, ControlValueAccessor {
  /**
   * Component Destroy subject, in your component `ngOnDestroy` method call `.next(true)`
   * and then `.complete()` on the `this.onDestroy$` subject
   */
  protected onDestroy$ = new Subject<boolean>();
  /**
   * Boolean, If set to true the `EditorJS` instance gets autofocus when initialized
   */
  @Input()
  public autofocus: boolean;

  /**
   * Boolean, If set to true the toolbar will not show in the `EditorJS` instance
   */
  @Input()
  public hideToolbar: boolean;

  /**
   * String, the ID property of the element that the `EditorJS` instance will be attached to
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
   * Number, The minimum height of the `EditorJS` instance bottom after the last block
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
   * Number, Used with Angular Forms this sets an autosave timer active that calls the `EditorJS` save
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
   * When created an instance of the service is available as
   * a public interface
   * @param service The editor service
   */
  constructor(protected readonly service: NgxEditorJSService, protected readonly fm: FocusMonitor) {}

  /**
   * Internal Subscription for the timer subscription
   */
  protected timerSubscription$: Subscription;

  /**
   * Get the current saved state
   */
  @Output()
  public isSaved = new EventEmitter<boolean>();

  /**
   * Internal method to return a new timer for the autosave support
   * @param time Time to do with autosave
   * @param timeStart When to trigger the first autosave
   */
  protected getTimer(time: number, timeStart = 0): Observable<number> {
    return timer(timeStart, time).pipe(
      timeInterval(),
      map(interval => interval.interval),
      tap(() => {
        this.service.save({ holder: this.holder });
        this.isSaved.emit(true);
      })
    );
  }

  /**
   * Form field value if used as a field component
   */
  protected _value: any;

  /**
   * Returns if the element has been touched
   */
  @Output()
  isTouched = new EventEmitter<boolean>();

  /**
   * Field on touch method
   */
  public onTouch = (event?: MouseEvent) => {
    this.isTouched.emit(true);
  };

  /**
   * Returns if the element has changed
   */
  @Output()
  hasChanged = new EventEmitter<Block[]>();

  /**
   * Field onChange method
   */
  public onChange = (blocks: Block[]) => {
    this.hasChanged.emit(blocks);
  };

  /**
   * Form Write Values
   * @param blocks
   */
  public writeValue(blocks: Block[]) {
    this._value = blocks;
  }

  /**
   * Register on Change for forms
   */
  public registerOnChange(fn: (blocks: Block[]) => void): void {
    this.onChange = fn;
  }

  /**
   * registerOnTouched for forms
   */
  public registerOnTouched(fn: (event?: MouseEvent) => void): void {
    this.onTouch = fn;
  }

  /**
   * Returns a focus monitor observable with the focus value,
   * the side effect of this monitor is to update the saved state and
   * start any autosave timers
   * @param element The element to monitor
   * @param checkChildren If the children should be checked
   */
  protected getFocusMonitor(element: HTMLElement, checkChildren = true) {
    return this.fm.monitor(element, checkChildren).pipe(
      map(origin => !!origin),
      tap(focused => {
        if (!focused) {
          if (!this.autosave) {
            this.isSaved.emit(false);
          }
          if (this.timerSubscription$) {
            this.timerSubscription$.unsubscribe();
          }
        } else {
          this.isSaved.emit(false);
          if (this.autosave > 0) {
            this.timerSubscription$ = this.getTimer(this.autosave, this.autosave).subscribe();
          }
        }
        return focused;
      })
    );
  }

  ngAfterContentInit() {}

  ngOnDestroy() {
    if (!this.onDestroy$.isStopped) {
      this.onDestroy$.next(true);
      this.onDestroy$.complete();
    }
  }

  /**
   * Get the ready status for the `EditorJS` instance
   */
  public get isReady(): Observable<boolean> {
    return this.service.isReady({ holder: this.holder });
  }

  /**
   * Get the changed status for the `EditorJS` instance
   */
  public getChanged(): Observable<number> {
    return this.service.getChanged({ holder: this.holder });
  }
}
