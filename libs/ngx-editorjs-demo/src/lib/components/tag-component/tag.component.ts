import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, forwardRef, HostBinding, Injector, Input, ViewChild } from '@angular/core';
import { Provider } from '@angular/core/src/render3/jit/compiler_facade_interface';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatChipInputEvent, MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';

/**
 * Tag Value Accessor
 */
export const TAG_COMPONENT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgxEditorJSDemoTagComponent),
  multi: true
};

/**
 * Provider for Material field support
 */
export const TAG_COMPONENT_FIELD_CONTROL: Provider = {
  provide: MatFormFieldControl,
  useExisting: forwardRef(() => NgxEditorJSDemoTagComponent),
  multi: true
};

@Component({
  selector: 'ngx-editorjs-tag-component',
  host: {
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy'
  },
  providers: [TAG_COMPONENT_VALUE_ACCESSOR, TAG_COMPONENT_FIELD_CONTROL],
  template: `
    <mat-chip-list #chipList>
      <mat-chip *ngFor="let tag of tags" [selectable]="true" [removable]="true" (removed)="removeTag(tag)">
        {{ tag }}
        <mat-icon matChipRemove *ngIf="true">cancel</mat-icon>
      </mat-chip>
      <input
        #chipListInput
        placeholder="New Tag..."
        [matChipInputFor]="chipList"
        [matChipInputSeparatorKeyCodes]="separatorKeysCodes"
        [matChipInputAddOnBlur]="true"
        (matChipInputTokenEnd)="addTag($event)"
      />
    </mat-chip-list>
  `
})
export class NgxEditorJSDemoTagComponent
  implements ControlValueAccessor, MatFormFieldControl<NgxEditorJSDemoTagComponent> {
  @ViewChild('chipListInput', { read: ElementRef }) chipListEl: ElementRef;
  /**
   * The separator keycodes for the tags input
   */
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input()
  tags: string[] = [];

  onChange = (tags: string[]) => {};
  onTouch = () => {};

  public removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
    this.onChange(this.tags);
  }

  public addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if (!this.tags) {
      this.tags = [];
    }

    if ((value || '').trim()) {
      this.tags = [...this.tags, value];
    }

    if (input) {
      input.value = '';
    }
    this.onChange(this.tags);
  }

  writeValue(tags: string[] = []) {
    this.tags = tags;
  }

  registerOnChange(fn: (tags: string[]) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouch = fn;
  }

  /**
   * Internal Static ID for Material
   */
  static nextId = 0;
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

  private _value: any;
  /**
   * Get the value of the material field
   */
  get value() {
    return this._value;
  }

  /**
   * Set the value of the material field
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
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  /**
   * Set the focused state of the element
   */

  private _focused: boolean;
  get focused() {
    return this._focused;
  }
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
  get required() {
    return this._required;
  }
  @Input('required')
  set required(required: boolean) {
    this._required = coerceBooleanProperty(required);
    this.stateChanges.next();
  }

  /**
   * Disabled state of the matertial component
   */
  private _disabled = false;
  get disabled() {
    return this._disabled;
  }
  @Input('disabled')
  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
    this.stateChanges.next();
  }

  /**
   * Host binding to the unique ID for this editor for material
   */
  @HostBinding()
  id = `ngx-editorjs-mat-field-${NgxEditorJSDemoTagComponent.nextId++}`;

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

  public get empty() {
    if (!this.tags) {
      return true;
    }
    return this.tags.length === 0;
  }

  public ngControl: NgControl;

  constructor(private readonly fm: FocusMonitor, private _injector: Injector) {}

  ngOnInit(): void {
    this.ngControl = this._injector.get(NgControl);
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngAfterContentInit(): void {
    this.fm.monitor(this.chipListEl.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.errorState = this.ngControl.invalid && this.ngControl.touched;
      this.stateChanges.next();
    }
  }

  onContainerClick(event: MouseEvent) {
    this.onTouch();
  }

  ngOnDestroy() {
    this.fm.stopMonitoring(this.chipListEl.nativeElement);
  }
}
