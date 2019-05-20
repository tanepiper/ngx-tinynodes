import { Component, Input, ViewChild, forwardRef, OnDestroy } from '@angular/core';
import { SanitizerConfig } from '@editorjs/editorjs';
import { NgxEditorJSDirective } from '../../directives/ngx-editorjs.directive';
import { NgxEditorJSService } from '../../services/editorjs.service';
import { Block } from '../../types/blocks';
import { EditorJSContainerComponent } from '../base/container.class';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxEditorJSFormComponent)
    }
  ]
})
export class NgxEditorJSFormComponent extends EditorJSContainerComponent implements ControlValueAccessor, OnDestroy {
  private onDestroy$ = new Subject<boolean>();
  /**
   * Access to the underlying editor directive
   */
  @ViewChild(NgxEditorJSDirective) public editor: NgxEditorJSDirective;

  /**
   * Constructs the Editor component
   * @param service The NgxEditorJSService instance
   */
  constructor(public readonly service: NgxEditorJSService) {
    super(service);

    this.service
      .hasChanged(this.holder)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(hasChanged => {
        this.onChange(hasChanged);
      });
  }

  onTouch = () => {};

  onChange = (changeTime: number) => {};

  writeValue(blocks: Block[]) {
    this.service.update(this.holder, blocks);
  }

  registerOnChange(fn: (changeTime: number) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouch = fn;
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
