import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';
import { NgxEditorJSService } from '../../services/editorjs.service';
import { NgxEditorJSConfig, NGX_EDITORJS_CONFIG } from '../../types/config';
import EditorJS from '@editorjs/editorjs';
import { Block } from '../../types/blocks';
import { NgxEditorJSDirective } from '../../directives/ngx-editorjs.directive';

@Component({
  selector: 'ngx-editorjs',
  templateUrl: 'editorjs.component.html',
  styleUrls: ['editorjs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxEditorJSComponent {
  @ViewChild(NgxEditorJSDirective) editorInstance: NgxEditorJSDirective;

  private onDestroy$ = new Subject<boolean>();

  @Input()
  holder = 'editor-js';

  @Input()
  blocks: Block[];

  constructor(
    private readonly editorService: NgxEditorJSService,
    @Inject(NGX_EDITORJS_CONFIG) private config: NgxEditorJSConfig
  ) {}

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes.blocks && !changes.blocks.firstChange) {
  //     this.editorService.update(changes.blocks.currentValue);
  //   }
  // }
}
