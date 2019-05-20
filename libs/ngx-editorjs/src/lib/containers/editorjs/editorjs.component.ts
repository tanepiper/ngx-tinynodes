import { Component, ViewChild } from '@angular/core';
import { NgxEditorJSDirective } from '../../directives/ngx-editorjs.directive';
import { NgxEditorJSService } from '../../services/editorjs.service';
import { EditorJSContainerComponent } from '../base/container.class';

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
export class NgxEditorJSComponent extends EditorJSContainerComponent {
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
  }
}
