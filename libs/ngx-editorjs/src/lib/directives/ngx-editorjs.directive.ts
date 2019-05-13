import { AfterContentInit, Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import EditorJS, { SanitizerConfig } from '@editorjs/editorjs';
import { createEditorJSConfig } from '../config/editor-config';
import { NgxEditorJSService } from '../services/editorjs.service';
import { Block } from '../types/blocks';
import { EditorJSConfig } from '../types/config';

/**
 * The main directive of `ngx-editorjs` provides a way to attach
 * an EditorJS instance to any element and control it via
 * Angular services and components
 *
 * To use attach to any element with an `id` property
 *
 * @example
 * <div id="my-editor" ngxEditorJS></div>
 */
@Directive({
  selector: '[ngxEditorJS]'
})
export class NgxEditorJSDirective implements OnDestroy, OnChanges, AfterContentInit {
  private id: string;

  /**
   * The ID of the dom element that will hold the editor
   */
  @Input()
  public holder: string;

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
   * The name of the initial block (default "paragraph")
   */
  @Input()
  public initialBlock: string;

  /**
   * Height of Editor's bottom area that allows to set focus on the last Block
   */
  @Input()
  public minHeight: number;

  /**
   * First Block placeholder
   */
  @Input()
  public placeholder: string;

  /**
   * Define default sanitizer configuration
   */
  @Input()
  public sanitizer: SanitizerConfig;

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
  public autosave: boolean;

  /**
   * An initial set of blocks to render in the component
   */
  @Input()
  public blocks: Block[];

  constructor(private readonly el: ElementRef, private readonly editorService: NgxEditorJSService) {}

  /**
   * Get the `EditorJS` instance for this directive
   */
  public get editor(): EditorJS {
    return this.editorService.getEditor(this.id);
  }

  /**
   * Get the `NgxEditorJSService` for this directive
   */
  public get service(): NgxEditorJSService {
    return this.editorService;
  }

  /**
   * Creates an `EditorJS` instance for this directive
   * @param config Configuration for this instance
   */
  public createEditor(config?: EditorJSConfig): void {
    this.editorService.createEditor(config, this.includeTools, this.autosave);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.blocks && !changes.blocks.firstChange) {
      this.editorService.update(this.id, changes.blocks.currentValue);
    }
  }

  ngAfterContentInit() {
    this.id = this.el.nativeElement.id || this.holder;

    const config: EditorJSConfig = createEditorJSConfig({
      holder: this.id,
      autofocus: this.autofocus,
      hideToolbar: this.hideToolbar,
      initialBlock: this.initialBlock,
      placeholder: this.placeholder,
      minHeight: this.minHeight,
      sanitizer: this.sanitizer
    });
    if (this.blocks && this.blocks.length > 0) {
      config.data = {
        time: Date.now(),
        version: EditorJS.version,
        blocks: this.blocks
      };
    }
    this.createEditor(config);
  }

  ngOnDestroy() {
    this.editorService.destroy(this.id);
  }
}
