import { Component, Input, ViewChild } from '@angular/core';
import { NgxEditorJSDirective } from '../../directives/ngx-editorjs.directive';
import { NgxEditorJSService } from '../../services/editorjs.service';
import { Block } from '../../types/blocks';

/**
 * This component is provided as a shortcut to using EditorJS in your
 * application. The attributes are optional and without a default component
 * will be created
 *
 * @example
 * <ngx-editorjs holder="my-editor"></ngx-editorjs>
 */
@Component({
  selector: 'ngx-editorjs',
  templateUrl: 'editorjs.component.html',
  styleUrls: ['editorjs.component.scss']
})
export class NgxEditorJSComponent {
  /**
   * Access to the underlying editor directive
   */
  @ViewChild(NgxEditorJSDirective) public editor: NgxEditorJSDirective;

  /**
   * The ID of the dom element that will hold the editor
   */
  @Input()
  public holder: string;

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
  constructor(public readonly service: NgxEditorJSService) {}
}
