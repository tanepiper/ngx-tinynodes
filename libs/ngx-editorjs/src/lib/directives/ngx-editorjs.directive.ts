import {
  AfterContentInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  Renderer2,
  HostListener
} from '@angular/core';
import EditorJS, { SanitizerConfig } from '@editorjs/editorjs';
import { Observable, BehaviorSubject } from 'rxjs';
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
  private touched$ = new BehaviorSubject<boolean>(false);

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
  public blocks: Block[] = [];

  @HostListener('click', ['$event'])
  onclick() {
    this.touched$.next(true);
  }

  constructor(private readonly el: ElementRef, private readonly editorService: NgxEditorJSService) {}

  /**
   * Get the `EditorJS` instance for this directive
   */
  public get editor(): Observable<EditorJS> {
    return this.service.getEditor(this.id);
  }

  public get element() {
    return this.el.nativeElement;
  }

  /**
   * Get the `NgxEditorJSService` for this directive
   */
  public get service(): NgxEditorJSService {
    return this.editorService;
  }

  public get touched() {
    return this.touched$.asObservable();
  }

  /**
   * Creates an `EditorJS` instance for this directive
   * @param config Configuration for this instance
   */
  public createEditor(config?: EditorJSConfig): void {
    this.service.createEditor({
      config,
      includeTools: this.includeTools,
      autoSave: this.autosave
    });
  }

  /**
   * When ngOnChanges are called, there are two paths
   * If it's just blocks, then the service is updated with the blocks
   * If it's any other property it means we create a new editor, as this
   * is a destructive process we also need to wait for an existing editor
   * to be ready
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.blocks && !changes.blocks.firstChange) {
      return this.service.update({ holder: this.id, blocks: changes.blocks.currentValue });
    }
    const changesKeys = Object.keys(changes);
    if (
      this.id &&
      // Ignore placeholder change
      ['autofocus', 'holder', 'hideToolbar', 'initialBlock', 'minHeight'].find(key => {
        return changesKeys.includes(key);
      })
    ) {
      this.createEditor(this.createConfig());
    }
  }

  /**
   * After content is created, we create the editor instance
   */
  ngAfterContentInit() {
    this.id = this.el.nativeElement.id || this.holder;

    if (!this.id) {
      throw new Error('Error in NgxEditorJSDirective::ngAfterContentInit - Directive element has no ID');
    }
    this.createEditor(this.createConfig());
  }

  /**
   * Destroy the editor and subjects for this service
   */
  ngOnDestroy() {
    this.service.destroy({ holder: this.id });
  }

  private createConfig(): EditorJSConfig {
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
    return config;
  }
}
