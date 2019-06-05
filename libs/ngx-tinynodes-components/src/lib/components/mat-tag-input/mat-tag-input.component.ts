import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  Injector,
  Input,
  Provider,
  ViewChild
} from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { NgxTinynodesMatFieldComponent } from '../../types/components';

/**
 * Tag Value Accessor
 */
export const TAG_COMPONENT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgxTinynodesMatTagInputComponent),
  multi: true
};

/**
 * Provider for Material field support
 */
export const TAG_COMPONENT_FIELD_CONTROL: Provider = {
  provide: MatFormFieldControl,
  useExisting: forwardRef(() => NgxTinynodesMatTagInputComponent),
  multi: true
};

@Component({
  selector: 'ngx-tinynodes-mat-tag-input',
  providers: [ TAG_COMPONENT_VALUE_ACCESSOR, TAG_COMPONENT_FIELD_CONTROL ],
  templateUrl: 'mat-tag-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxTinynodesMatTagInputComponent
  implements NgxTinynodesMatFieldComponent<NgxTinynodesMatTagInputComponent> {
  /**
   * Internal Static ID for Material
   */
  static nextId = 0;

  /**
   * The chip input list
   */
  @ViewChild('chipListInput', { read: ElementRef, static: true }) public readonly chipListEl: ElementRef;
  /**
   * The separator keycodes for the tags input
   */
  readonly separatorKeysCodes: number[] = [ ENTER, COMMA ];

  /**
   * The tags to display on load
   */
  @Input()
  tags: string[] = [];

  /**
   * Material Form Control state changes
   */
  public stateChanges = new Subject<void>();

  /**
   * The control type for this component
   */
  public controlType = 'ngx-tag-component';

  /**
   * The Material error state
   */
  public errorState = false;

  /**
   * Host binding to the unique ID for this editor for material
   */
  @HostBinding()
  id = `ngx-editorjs-mat-field-${ NgxTinynodesMatTagInputComponent.nextId++ }`;

  /**
   * Host binding for ARIA label
   */
  @HostBinding('attr.aria-describedby')
  describedBy = '';

  /**
   * The Angular form control
   */
  public ngControl: NgControl;

  /**
   *
   * @param focusMonitor The focus monitor for the component
   * @param injector
   */
  constructor(private readonly focusMonitor: FocusMonitor, private readonly injector: Injector, private readonly cd: ChangeDetectorRef) {
  }

  /**
   * The value of the component
   */
  private _value: any;

  /**
   * Get the value of the material field
   */
  get value() {
    return this._value;
  }

  /**
   * Set the value of the material field
   * @param value The value to set of the field
   */
  @Input('value')
  set value(value: any) {
    this._value = value;
    this.stateChanges.next();
  }

  /**
   * Placeholder value
   */
  private _placeholder: string;

  /**
   * Get the Placeholder value
   */
  get placeholder() {
    return this._placeholder;
  }

  /**
   * Set the Placeholder value
   */
  @Input('placeholder')
  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }

  /**
   * Set the focused state of the element
   */
  private _focused: boolean;

  /**
   * Get the focused state
   */
  get focused() {
    return this._focused;
  }

  /**
   * Set the focused state
   * @param focused
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
   * Get the required value
   */
  get required() {
    return this._required;
  }

  /**
   * Set the required value
   * @param required
   */
  @Input('required')
  set required(required: boolean) {
    this._required = coerceBooleanProperty(required);
    this.stateChanges.next();
  }

  /**
   * Disabled state of the material component
   */
  private _disabled = false;

  /**
   * Get the disabled state
   */
  get disabled() {
    return this._disabled;
  }

  /**
   * Set the disabled state
   * @param disabled
   */
  @Input('disabled')
  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
    this.stateChanges.next();
  }

  /**
   * Gets if the Material label should float
   */
  @HostBinding('class.floating')
  public get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  public get empty() {
    if (!this.tags) {
      return true;
    }
    return this.tags.length === 0;
  }

  /**
   * Form OnChange method
   * @param tags Tags to be set
   */
  public onChange(tags: string[]) {
    this.writeValue(tags);
  }

  /**
   * Form OnTouch method
   */
  public onTouch() {
  }

  /**
   * Remove a tag from the component
   * @param tag The tag to remove
   */
  public removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
    this.onChange(this.tags);
  }

  /**
   * Add a tag to the
   * @param event
   */
  public addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (!this.tags) {
      this.tags = [];
    }

    if ((value || '').trim()) {
      this.tags = [ ...this.tags, value ];
    }

    if (input) {
      input.value = '';
    }
    this.onChange(this.tags);
  }

  writeValue(tags: string[] = []) {
    this.tags = tags;
    this.cd.markForCheck();
  }

  registerOnChange(fn: (tags: string[]) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouch = fn;
  }

  /**
   *
   * @param ids The IDs of the Material components
   */
  public setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  /**
   * Material method for when the container is clicked
   * @param event
   */
  public onContainerClick(event: MouseEvent) {
    this.onTouch();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl);
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterContentInit(): void {
    this.focusMonitor.monitor(this.chipListEl.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
      this.cd.markForCheck();
    });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngDoCheck(): void {
    if (this.ngControl) {
      this.errorState = this.ngControl.invalid && this.ngControl.touched;
      this.stateChanges.next();
    }
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.chipListEl.nativeElement);
  }
}
