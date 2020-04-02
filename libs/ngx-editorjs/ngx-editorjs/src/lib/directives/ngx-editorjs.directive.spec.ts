import { Component, DebugElement, EventEmitter, SimpleChanges } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockEditorJS, MockPlugin } from '../../testing/shared';
import { Block } from '../types/blocks';
import { FOR_ROOT_OPTIONS_TOKEN, NGX_EDITORJS_CONFIG } from '../types/config';
import { NgxEditorJSDirective } from './ngx-editorjs.directive';
import { EDITORJS_MODULE_IMPORT, EditorJSInstance } from '../types/injector';
import { createModuleConfig } from '../..';
import EditorJS from '@editorjs/editorjs';
import { createEditorJSInstance } from '../containers/editorjs/editorjs.module';
import {
  createPluginConfig,
  EDITOR_JS_TOOL_INJECTOR,
  NgxEditorjsPluginsModule,
  PLUGIN_CONFIG,
  PluginClasses,
} from '@tinynodes/ngx-editorjs-plugins';

describe('NgxEditorJSDirective', () => {
  /**
   * Mock Component for Tests
   */
  @Component({
    template: ` <div [holder]="'my-editor'" ngxEditorJS></div> `,
  })
  class MockComponent {
    change = new EventEmitter<any>();
  }

  let fixture: ComponentFixture<MockComponent>;
  let componentInstance: MockComponent;
  let directiveElement: DebugElement;
  let directive: NgxEditorJSDirective;

  const blocks: Block[] = [
    {
      type: 'test',
      data: {
        text: 'test',
      },
    },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxEditorjsPluginsModule],
      declarations: [NgxEditorJSDirective, MockComponent],
      providers: [
        {
          provide: PLUGIN_CONFIG,
          useValue: {
            key: 'plugin',
            type: 'block',
            pluginName: 'EditorJS Mock Block Plugin',
          },
          multi: true,
        },
        {
          provide: EDITOR_JS_TOOL_INJECTOR,
          useValue: MockPlugin,
          multi: true,
        },
        {
          provide: PluginClasses,
          useFactory: createPluginConfig,
          deps: [PLUGIN_CONFIG, EDITOR_JS_TOOL_INJECTOR],
        },
        {
          provide: FOR_ROOT_OPTIONS_TOKEN,
          useValue: {},
        },
        {
          provide: NGX_EDITORJS_CONFIG,
          useFactory: createModuleConfig,
          deps: [FOR_ROOT_OPTIONS_TOKEN],
        },
        {
          provide: EDITORJS_MODULE_IMPORT,
          useValue: EditorJS,
        },
        {
          provide: EditorJSInstance,
          useFactory: createEditorJSInstance,
          deps: [EDITORJS_MODULE_IMPORT],
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MockComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
    directiveElement = fixture.debugElement.query(By.directive(NgxEditorJSDirective));
    directive = directiveElement.injector.get<NgxEditorJSDirective>(NgxEditorJSDirective);
  }));

  it('should create the directive on the component', () => {
    expect(directive).toBeDefined();
  });

  it('should provide the editor instance', (done) => {
    directive.editor.subscribe((editor) => {
      expect(editor).toBeInstanceOf(MockEditorJS);
      done();
    });
  });

  it('should update the service when changes are detected', () => {
    spyOn(directive.service, 'update');

    const changes: SimpleChanges = {
      blocks: {
        firstChange: false,
        previousValue: [],
        currentValue: blocks,
        isFirstChange: () => false,
      },
    };
    directive.ngOnChanges(changes);
    expect(directive.service.update).toHaveBeenCalled();
  });

  it('should create a new instance when another property is changed', () => {
    spyOn(directive, 'createEditor');

    const changes: SimpleChanges = {
      autofocus: {
        firstChange: false,
        previousValue: false,
        currentValue: true,
        isFirstChange: () => false,
      },
    };
    directive.autofocus = true;
    directive.ngOnChanges(changes);

    expect(directive.createEditor).toHaveBeenCalledWith({
      autofocus: true,
      holder: 'my-editor',
    });
  });
});
