import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  forwardRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Provider,
  Self,
  ViewChild
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxEditorJSDirective } from '../../directives/ngx-editorjs.directive';
import { NgxEditorJSService } from '../../services/editorjs.service';
import { NgxEditorJSComponent } from '../editorjs/editorjs.component';

/**
 * Provider for the EditorJS Material Field Component
 */
export const EDITORJS_MATERIAL_FIELD_CONTROL: Provider = {
  provide: MatFormFieldControl,
  useExisting: forwardRef(() => NgxEditorJSMatFieldComponent),
  multi: true
};

/**
 * Single interface for EditorJSMaterialForm
 */
export interface EditorJSMaterialForm
  extends MatFormFieldControl<NgxEditorJSMatFieldComponent>,
    OnInit,
    AfterContentInit,
    OnDestroy,
    DoCheck {}

/**
 * This component provides a [Material](https://material.angular.io) compatible `<mat-form-field>` component.
 * It provides a full implementation of all the required properties of a Material component
 *
 * @example
 * <mat-form-field>
 *  <ngx-editorjs-mat-field holder="my-editor"></ngx-editorjs>
 * </mat-form-field>
 */
@Component({
  selector: 'ngx-editorjs-mat-field',
  templateUrl: 'editorjs-mat-field.component.html',
  styleUrls: ['editorjs-mat-field.component.scss'],
  host: {
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy'
  },
  providers: [EDITORJS_MATERIAL_FIELD_CONTROL],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxEditorJSMatFieldComponent extends NgxEditorJSComponent implements EditorJSMaterialForm {
  /**
   * Internal Static ID for Material for each editor instance
   */
  static nextId = 0;
  /**
   * Material state change subject
   */
  public stateChanges = new Subject<void>();

  /**
   * Material control type
   */
  public controlType = 'ngx-editorjs-mat-field';

  /**
   * Material error state
   */
  public errorState = false;

  /**
   * Get the component value
   */
  get value(): any {
    return this._value;
  }

  /**
   * Set the component value
   * @param value The value to set
   */
  @Input('value')
  set value(value: any) {
    this._value = value;
    this.stateChanges.next();
  }

  /**
   * Material placeholder value
   */
  private _placeholder: string;

  /**
   * Get the Material placeholder value
   */
  get placeholder() {
    return this._placeholder;
  }
  /**
   * Set the material Placeholder value
   * @input placeholder The placeholder state to set
   */
  @Input('placeholder')
  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }

  /**
   * Material focused state
   */
  private _focused: boolean;
  /**
   * Get the Material focused state
   */
  get focused() {
    return this._focused;
  }
  /**
   * Set the Material focused state
   * @param focused The focused state to set
   */
  @Input('focused')
  set focused(focused: boolean) {
    this._focused = coerceBooleanProperty(focused);
    if (this._focused) {
      this.onTouch();
    }
    this.stateChanges.next();
  }

  /**
   * Material Required Value
   */
  private _required = false;

  /**
   * Get the Material required state
   */
  get required() {
    return this._required;
  }
  /**
   * Set the Material requied state
   * @param required The required state to set
   */
  @Input('required')
  set required(required: boolean) {
    this._required = coerceBooleanProperty(required);
    this.stateChanges.next();
  }

  /**
   * Material disabled state
   */
  private _disabled = false;

  /**
   * Get the Material disabled state
   */
  get disabled() {
    return this._disabled;
  }
  /**
   * Set the Material disabled state
   * @param disabled The disabled state to set
   */
  @Input('disabled')
  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
    this.stateChanges.next();
  }

  /**
   * Material empty state
   */
  private _empty: boolean;
  /**
   * Get the Material empty state
   */
  public get empty() {
    return this._empty;
  }
  /**
   * Set the Material empty state
   * @param empty The empty value
   */
  public set empty(empty: boolean) {
    this._empty = empty;
  }

  /**
   * Access to the underlying {NgxEditorJSDirective}
   */
  @ViewChild('editorInstance', { read: NgxEditorJSDirective, static: true }) public readonly editorInstance: NgxEditorJSDirective;

  /**
   * Host binding to the unique ID for this editor for material
   */
  @HostBinding()
  id = `ngx-editorjs-mat-field-${NgxEditorJSMatFieldComponent.nextId++}`;

  /**
   * Gets if the Material label should float
   */
  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  /**
   * Host binding for ARIA label
   */
  @HostBinding('attr.aria-describedby') describedBy = '';

  /**
   *
   * @param ids The IDs of the Material components
   */
  public setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  /**
   * Material on container click
   * @param event The {MouseEvent} for the container click
   */
  public onContainerClick(event: MouseEvent) {
    this.onTouch(event);
    this.stateChanges.next();
  }

  /**
   * Constructor for the Material field, as this extends the `NgxEditorJSComponent` component
   * we call `super()` to get all the properties of that component
   * @param editorService The NgxEditorJSService instance
   * @param focusMonitor Focus monitor for the Material element
   * @parma cd The Change detection ref
   * @param ngControl The Angular control base class
   */
  constructor(
    protected readonly editorService: NgxEditorJSService,
    protected focusMonitor: FocusMonitor,
    protected readonly changeDetection: ChangeDetectorRef,
    @Optional() @Self() public ngControl: NgControl
  ) {
    super(editorService, focusMonitor, changeDetection);
  }

  /**
   * Called on OnInit
   */
  public ngOnInit(): void {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  /**
   * Inside the AfterContentInit life-cycle we set up a listener for focus
   * and trigger focus autosave subscribe and unsubscribe
   */
  public ngAfterContentInit(): void {
    this.setupServiceSubscriptions();
    this.getFocusMonitor(this.editorInstance.element)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(focused => {
        this.onTouch();
        this.focused = focused;
        this.stateChanges.next();
      });
  }

  /**
   * Set the error state based on the underlying control state
   */
  ngDoCheck(): void {
    if (this.ngControl) {
      this.errorState = this.ngControl.invalid && this.ngControl.touched;
      this.stateChanges.next();
    }
  }
}
