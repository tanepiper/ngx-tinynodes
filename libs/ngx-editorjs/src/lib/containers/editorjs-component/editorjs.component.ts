import { Component, Input, ViewChild } from '@angular/core';
import { NgxEditorJSDirective } from '../../directives/ngx-editorjs.directive';
import { NgxEditorJSService } from '../../services/editorjs.service';
import { Block } from '../../types/blocks';

@Component({
  selector: 'ngx-editorjs',
  templateUrl: 'editorjs.component.html',
  styleUrls: ['editorjs.component.scss']
})
export class NgxEditorJSComponent {
  @ViewChild(NgxEditorJSDirective) public editor: NgxEditorJSDirective;

  @Input()
  public holder: string;

  @Input()
  public blocks: Block[];

  constructor(private readonly service: NgxEditorJSService) {}
}
