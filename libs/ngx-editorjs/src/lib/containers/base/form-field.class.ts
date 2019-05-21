import { Injectable, Input, Component, Provider, forwardRef } from '@angular/core';
import { SanitizerConfig } from '@editorjs/editorjs';
import { NgxEditorJSService } from '../../services/editorjs.service';
import { Block } from '../../types/blocks';
import { EditorJSContainerComponent } from './container.class';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

/**
 * This provides the Control Value Accessor for the form component
 */
export const EDITORJS_FORM_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EditorJSFormField),
  multi: true
};

/**
 * A base EditorJS component for form components in Angular
 */
@Component({
  template: ''
})
export class EditorJSFormField extends EditorJSContainerComponent implements ControlValueAccessor {
  protected _value: Block[];

  onTouch = () => {};

  onChange = (blocks: Block[]) => {};

  /**
   * Form Write Values
   * @param blocks
   */
  public writeValue(blocks: Block[]) {
    this._value = blocks;
  }

  registerOnChange(fn: (blocks: Block[]) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouch = fn;
  }
}
