import {
  AfterContentInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import EditorJS, { EditorConfig, OutputData, SanitizerConfig } from '@editorjs/editorjs';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { createEditorJSConfig } from '../config/editor-config';
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
 * <div id="my-editor" ngxEditorJS></div>
 */
@Directive({
  selector: '[ngxEditorJS]'
})
export class NgxEditorJSDirective implements OnDestroy, OnChanges, AfterContentInit {
  /**
   * On Destroyed subject
   */
  private readonly onDestroy$ = new Subject<boolean>();
  /**
   * Form touched state
   */
  private touched$ = new BehaviorSubject<boolean>(false);

  /**
   * The DOM element ID, it will use the Directive DOM element ID or falls back to the provided `holder` property
   */
  private id: string;

  /**
   * Boolean, If set to true the EditorJS instance gets autofocus when initialized
   */
  @Input()
  public autofocus: boolean;

  /**
   * Boolean, If set to true the toolbar will not show in the EditorJS instance
   */
  @Input()
  public hideToolbar: boolean;

  /**
   * String, the ID property of the element that the EditorJS instance will be attached to
   */
  @Input()
  public holder: string;

  /**
   * String, The type of block to set as the initial block type. This needs to match a name in the `UserPlugins` object.
   * The default value is "paragraph"
   */
  @Input()
  public initialBlock?: string;

  /**
   * Number, The minimum height of the EditorJS instance bottom after the last block
   */
  @Input()
  public minHeight: number;

  /**
   * String, The text to display as the placeholder text in the first block before content is added
   */
  @Input()
  public blockPlaceholder: string;

  /**
   * SanitizerConfig, The configuration for the HTML sanitizer
   */
  @Input()
  public sanitizer: SanitizerConfig;

  /**
   * String Array, If empty all tools available via the plugin service will be added.  If a string
   * array is set only the tools with the provided keys will be added
   */
  @Input()
  public includeTools: string[] = [];

  /**
   * Number, Used with Angular Forms this sets an autosave timer active that calls the EditorJS save
   * method. This patches the `FormControl` value with every block change and focus and blur, it also autosaves after
   * a set time
   * Set to 0 to disable or pass a value in `ms` of the autosave time
   */
  @Input()
  public autosave: number;

  /**
   * Blocks, An initial set of block data to render inside the component
   */
  @Input()
  public blocks: Block[];

  /**
   * Emits if the content from the EditorJS instance has been saved to the component value
   */
  @Output()
  public hasSaved = new EventEmitter<boolean>();

  /**
   * Emits if the component has been touched
   */
  @Output()
  public isTouched = new EventEmitter<boolean>();

  /**
   * Emits if the component is focused
   */
  @Output()
  public isFocused = new EventEmitter<boolean>();

  /**
   * Emits if the EditorJS content has changed when `save` is called
   */
  @Output()
  public hasChanged = new EventEmitter<OutputData>();

  /**
   * Emits if the EditorJS component is ready
   */
  @Output()
  public isReady = new EventEmitter<boolean>();

  /**
   * Host click listener
   */
  @HostListener('click')
  onclick() {
    this.touched$.next(true);
    this.isTouched.emit(true);
    this.cd.markForCheck();
  }

  /**
   * Creates the directive instance
   * @param el The element the directive is attached to
   * @param editorService The editor service
   */
  constructor(
    protected readonly el: ElementRef,
    protected readonly editorService: NgxEditorJSService,
    protected readonly cd: ChangeDetectorRef
  ) {}

  /**
   * Get the EditorJS instance for this directive
   */
  public get editor(): Observable<EditorJS> {
    return this.service.getEditor({ holder: this.id });
  }

  /**
   * Get the element for the directive
   */
  public get element() {
    return this.el.nativeElement;
  }

  /**
   * Get the `NgxEditorJSService` for this directive
   */
  public get service(): NgxEditorJSService {
    return this.editorService;
  }

  /**
   * Get the touched state
   */
  public get touched() {
    return this.touched$.asObservable();
  }

  /**
   * Creates an EditorJS instance for this directive
   * @param config Configuration for this instance
   */
  public async createEditor(config?: EditorConfig): Promise<void> {
    await this.service.createInstance({
      config,
      includeTools: this.includeTools,
      autoSave: this.autosave || 0
    });
    this.cd.markForCheck();
  }

  /**
   * When ngOnChanges are called, there are two paths
   * If it's just blocks, then the service is updated with the blocks
   * If it's any other property it means we create a new editor, as this
   * is a destructive process we also need to wait for an existing editor
   * to be ready
   * @param changes Changes on the component
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.blocks &&
      !changes.blocks.firstChange &&
      JSON.stringify(changes.blocks.previousValue) !== JSON.stringify(changes.blocks.currentValue)
    ) {
      this.service.update({ holder: this.id, blocks: changes.blocks.currentValue });
      this.cd.markForCheck();
      return;
    }
    const changesKeys = Object.keys(changes);
    if (
      this.id &&
      // Ignore changes for values not related to EditorJS
      [
        'autofocus',
        'holder',
        'hideToolbar',
        'initialBlock',
        'minHeight',
        'blockPlaceholder',
        'sanitizer',
        'includeTools'
      ].find(key => {
        return changesKeys.includes(key);
      })
    ) {
      this.createEditor(this.createConfig());
      this.cd.markForCheck();
    }
  }

  /**
   * After content is created, we create the editor instance and set up listners
   */
  ngAfterContentInit() {
    this.id = this.el.nativeElement.id || this.holder;

    if (!this.id) {
      throw new Error('Error in NgxEditorJSDirective::ngAfterContentInit - Directive element has no ID');
    }
    this.createEditor(this.createConfig());

    this.service
      .isReady({ holder: this.holder })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(isReady => {
        this.isReady.emit(isReady);
        this.cd.markForCheck();
      });

    this.service
      .hasChanged({ holder: this.holder })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(change => {
        this.hasChanged.emit(change);
        this.cd.markForCheck();
      });

    this.service
      .hasSaved({ holder: this.holder })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(saved => {
        this.hasSaved.next(saved);
        this.cd.markForCheck();
      });
  }

  /**
   * Destroy the editor and subjects for this service
   */
  ngOnDestroy() {
    this.service.destroyInstance({ holder: this.id });
  }

  /**
   * Create a configuration for EditorJS
   */
  private createConfig(): EditorConfig {
    const config: EditorConfig = createEditorJSConfig({
      holder: this.id,
      autofocus: this.autofocus,
      hideToolbar: this.hideToolbar,
      initialBlock: this.initialBlock,
      placeholder: this.blockPlaceholder,
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
