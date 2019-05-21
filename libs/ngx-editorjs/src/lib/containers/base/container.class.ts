import { Injectable, Input, Component, OnDestroy, forwardRef } from '@angular/core';
import { SanitizerConfig } from '@editorjs/editorjs';
import { NgxEditorJSService } from '../../services/editorjs.service';
import { Block } from '../../types/blocks';
import { Subject, Observable } from 'rxjs';
import { Provider } from '@angular/core/src/render3/jit/compiler_facade_interface';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/**
 * This provides the Control Value Accessor for the form component
 */
export const EDITORJS_FORM_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EditorJSBaseComponent),
  multi: true
};

/**
 * A base EditorJS component, can be used to create other extended components
 */
@Component({
  template: '',
  providers: [EDITORJS_FORM_VALUE_ACCESSOR]
})
export class EditorJSBaseComponent implements OnDestroy, ControlValueAccessor {
  /**
   * Private destroy subject
   */
  private onDestroy$ = new Subject<boolean>();
  /**
   * Sets if the `EditorJS` component will request autofocus in the browser
   */
  @Input()
  public autofocus: boolean;

  /**
   * Sets if the toolbar will be shown in `EditorJS`
   */
  @Input()
  public hideToolbar: boolean;

  /**
   * The ID of the dom element that will hold the editor
   */
  @Input()
  public holder: string;

  /**
   * The name of the initial block (default "paragraph")
   */
  @Input()
  public initialBlock?: string;

  /**
   * Height of Editor's bottom area that allows to set focus on the last Block
   */
  @Input()
  public minHeight?: number;

  /**
   * First Block placeholder
   */
  @Input()
  public blockPlaceholder?: string;

  /**
   * Define default sanitizer configuration
   */
  @Input()
  public sanitizer?: SanitizerConfig;

  /**
   * A string array of tools that will be included in this instance, if empty
   * all tools will be included
   */
  @Input()
  public includeTools: string[] = [];

  /**
   * If set, when the `EditorJS` save is called the `Observable` of blocks will be updated,
   * if set to `false` on the change `Observable` will be updated
   */
  @Input()
  public autosave: number;

  /**
   * An initial set of blocks to render in the component
   */
  @Input()
  public blocks: Block[];

  /**
   * When created an instance of the service is available as
   * a public interface
   * @param service The editor service
   */
  constructor(protected readonly service: NgxEditorJSService) {}

  /**
   * Form field value if used as a field component
   */
  protected _value: any;

  /**
   * Field on touch method
   */
  onTouch = (event?: MouseEvent) => {};

  /**
   * Field onChange method
   */
  onChange = (blocks: Block[]) => {};

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
  registerOnChange(fn: (blocks: Block[]) => void) {
    this.onChange = fn;
  }

  /**
   * registerOnTouched for forms
   */
  registerOnTouched(fn: (event?: MouseEvent) => void) {
    this.onTouch = fn;
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  /**
   * Get the ready status for the `EditorJS` instance
   */
  public get isReady(): Observable<boolean> {
    return this.service.isReady(this.holder);
  }

  /**
   * Get the changed status for the `EditorJS` instance
   */
  public getChanged(): Observable<number> {
    return this.service.getChanged(this.holder);
  }
}
