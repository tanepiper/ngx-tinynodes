import {
  AfterContentInit,
  Directive,
  ElementRef,
  Inject,
  OnDestroy,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  AfterViewInit
} from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import { Subject } from 'rxjs';
import { NgxEditorJSService } from '../services/editorjs.service';
import { NGX_EDITORJS_CONFIG, NgxEditorJSConfig } from '../types/config';
import { Block } from '../types/blocks';

@Directive({
  selector: '[ngxEditorJS]'
})
export class NgxEditorJSDirective
  implements OnDestroy, OnChanges, AfterViewInit {
  private onDestroy$ = new Subject<boolean>();

  @Input()
  blocks: Block[] = [];

  constructor(
    private el: ElementRef,
    private editorService: NgxEditorJSService,
    @Inject(NGX_EDITORJS_CONFIG) private config: NgxEditorJSConfig
  ) {}

  get editor(): EditorJS {
    return this.editorService.editor;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.blocks && !changes.blocks.firstChange) {
      this.editorService.update(changes.blocks.currentValue);
    }
  }

  ngAfterViewInit() {
    this.editorService.init(
      this.el.nativeElement.id,
      this.config.editorjs,
      this.blocks
    );
  }

  ngOnDestroy() {
    this.editor.destroy();
    this.editorService.destroy();
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
