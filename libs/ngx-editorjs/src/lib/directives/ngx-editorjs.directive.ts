import { AfterViewInit, Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import { NgxEditorJSService } from '../services/editorjs.service';
import { Block } from '../types/blocks';

/**
 * The main directive of `ngx-editorjs` provides a way to attach
 * an EditorJS instance to any element and control it via
 * Angular services and components
 *
 * To use attach to any element with an `id` property
 *
 * @example
 * ```html
 * <div id="my-editor" ngxEditorJS></div>
 * ```
 */
@Directive({
  selector: '[ngxEditorJS]'
})
export class NgxEditorJSDirective implements OnDestroy, OnChanges, AfterViewInit {
  /**
   * Provide `EditorJS` blocks to render within the instance
   */
  @Input()
  blocks: Block[] = [];

  constructor(private readonly el: ElementRef, public readonly editorService: NgxEditorJSService) {}

  /**
   * Get the instance of the editor this directive has created
   */
  get editor(): EditorJS {
    return this.editorService.getEditor(this.el.nativeElement.id);
  }

  get service(): NgxEditorJSService {
    return this.editorService;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.blocks && !changes.blocks.firstChange) {
      this.editorService.update(this.el.nativeElement.id, changes.blocks.currentValue);
    }
  }

  ngAfterViewInit() {
    this.editorService.createEditor(this.el.nativeElement.id, this.blocks);
  }

  ngOnDestroy() {
    this.editorService.destroy(this.el.nativeElement.id);
  }
}
