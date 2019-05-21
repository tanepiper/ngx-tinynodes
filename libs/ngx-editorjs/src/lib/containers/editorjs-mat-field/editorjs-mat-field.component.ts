import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
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
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { NgxEditorJSDirective } from '../../directives/ngx-editorjs.directive';
import { NgxEditorJSService } from '../../services/editorjs.service';
import { Block } from '../../types/blocks';
import { EditorJSFormField } from '../base/form-field.class';

/**
 * Provider for Material field support
 */
export const EDITORJS_MATERIAL_FIELD_CONTROL: Provider = {
  provide: MatFormFieldControl,
  useExisting: forwardRef(() => NgxEditorJSMatFieldComponent),
  multi: true
};

/**
 * Interface for the component
 */
export interface EditorJSMaterialForm extends OnInit, AfterContentInit, OnDestroy, DoCheck, MatFormFieldControl<any> {}

/**
 * This component is provided as a shortcut to using EditorJS in your
 * application. The attributes are optional and without a default component
 * will be created
 *
 * @example
 * <ngx-editorjs-mat-field holder="my-editor"></ngx-editorjs>
 */
@Component({
  selector: 'ngx-editorjs-mat-field',
  templateUrl: 'editorjs-mat-field.component.html',
  styleUrls: ['editorjs-mat-field.component.scss'],
  host: {
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy'
  },
  providers: [EDITORJS_MATERIAL_FIELD_CONTROL]
})
export class NgxEditorJSMatFieldComponent extends EditorJSFormField implements EditorJSMaterialForm {
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
  public controlType = 'editorjs-form';

  /**
   * The Material error state
   */
  public errorState = false;

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
  set value(blocks: Block[]) {
    this._value = blocks;
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
   * Access to the underlying editor directive
   */
  @ViewChild(NgxEditorJSDirective) public editor: NgxEditorJSDirective;

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
   * Returns if the editor has
   */
  public get empty() {
    let empty = true;
    this.service
      .getBlocks(this.holder)
      .pipe(
        take(1),
        tap(blocks => {
          if (blocks) {
            this.writeValue(blocks);
            this.onChange(blocks);
            this.stateChanges.next();
          }
        }),
        map(blocks => blocks.length === 0)
      )
      .subscribe(e => (empty = e));
    return empty;
  }

  /**
   * Constructs the Editor component
   * @param service The NgxEditorJSService instance
   */
  constructor(
    public readonly service: NgxEditorJSService,
    private readonly fm: FocusMonitor,
    @Optional() @Self() public ngControl: NgControl
  ) {
    super(service);
  }

  ngOnInit(): void {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngAfterContentInit(): void {
    this.editor.touched.subscribe(() => this.onTouch());

    this.fm.monitor(this.editor.element, true).subscribe(origin => {
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
    this.fm.stopMonitoring(this.editor.element);
  }
}
