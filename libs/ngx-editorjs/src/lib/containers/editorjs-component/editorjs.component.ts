import { Component, Input, ViewChild } from '@angular/core';
import { SanitizerConfig } from '@editorjs/editorjs';
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
   * The ID of the dom element that will hold the editor
   */
  @Input()
  public holder: string;

  /**
   * The name of the initial block (default "paragraph")
   */
  @Input()
  public initialBlock?: string;

  /**
   * Height of Editor's bottom area that allows to set focus on the last Block
   */
  @Input()
  public minHeight?: number;

  /**
   * First Block placeholder
   */
  @Input()
  public placeholder?: string;

  /**
   * Define default sanitizer configuration
   */
  @Input()
  public sanitizer?: SanitizerConfig;

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

  /**
   * When created an instance of the service is available as
   * a public interface
   * @param service The editor service
   */
  constructor(public readonly service: NgxEditorJSService) {}
}
