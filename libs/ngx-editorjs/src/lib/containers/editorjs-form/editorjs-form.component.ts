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
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxEditorJSDirective } from '../../directives/ngx-editorjs.directive';
import { NgxEditorJSService } from '../../services/editorjs.service';
import { Block } from '../../types/blocks';
import { EditorJSContainerComponent } from '../base/container.class';

/**
 * This provides the Control Value Accessor for the form component
 */
export const EDITORJS_FORM_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgxEditorJSFormComponent),
  multi: true
};

export const EDITORJS_MATERIAL_FIELD_CONTROL: Provider = {
  provide: MatFormFieldControl,
  useExisting: forwardRef(() => NgxEditorJSFormComponent)
};

/**
 * This component is provided as a shortcut to using EditorJS in your
 * application. The attributes are optional and without a default component
 * will be created
 *
 * @example
 * <ngx-editorjs holder="my-editor"></ngx-editorjs>
 */
@Component({
  selector: 'ngx-editorjs-form',
  templateUrl: 'editorjs-form.component.html',
  styleUrls: ['editorjs-form.component.scss'],
  host: {
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy'
  },
  providers: [EDITORJS_FORM_VALUE_ACCESSOR, EDITORJS_MATERIAL_FIELD_CONTROL]
})
export class NgxEditorJSFormComponent extends EditorJSContainerComponent
  implements ControlValueAccessor, OnInit, AfterContentInit, OnDestroy, DoCheck, MatFormFieldControl<any> {
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

  private _value: Block[];

  get value() {
    return this.value;
  }

  set value(blocks: Block[]) {
    console.log(blocks);
    this._value = blocks;
    this.service.update({
      holder: this.holder,
      blocks
    });
    this.onChange(blocks);
    this.stateChanges.next();
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get focused() {
    return this._focused;
  }
  set focused(focused: boolean) {
    console.log(focused);
    this._focused = focused;
  }
  private _focused: boolean;

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }
  private _disabled = false;
  /**
   * Private destroy subject
   */
  private onDestroy$ = new Subject<boolean>();
  /**
   * Access to the underlying editor directive
   */
  @ViewChild(NgxEditorJSDirective) public editor: NgxEditorJSDirective;

  @HostBinding() id = `ngx-editorjs-form-${NgxEditorJSFormComponent.nextId++}`;

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @HostBinding('attr.aria-describedby') describedBy = '';
  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  get empty() {
    return this.editor.blocks && this.editor.blocks.length === 0;
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

    this.service
      .getBlocks(this.holder)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(blocks => this.onChange(blocks));
  }

  ngOnInit(): void {
    if (this.ngControl !== null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngAfterContentInit(): void {
    this.editor.touched.subscribe(() => this.onTouch());

    this.fm.monitor(this.editor.element, true).subscribe(origin => {
      this._focused = !!origin;
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

  onTouch = () => {};

  onChange = (blocks: Block[]) => {};

  writeValue(blocks: Block[]) {
    console.log('write value', blocks);
    this.service.update({ holder: this.holder, blocks });
  }

  registerOnChange(fn: (blocks: Block[]) => void) {
    console.log('on change registered');
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouch = fn;
  }

  ngOnDestroy() {
    this.fm.stopMonitoring(this.editor.element);
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
