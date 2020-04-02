import { Component, NgZone, ViewChild } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { MockNgZone } from '../../../testing/ng-zone-mock';
import { NgxEditorJSDirective } from '../../directives/ngx-editorjs.directive';
import { FOR_ROOT_OPTIONS_TOKEN, NGX_EDITORJS_CONFIG } from '../../types/config';
import { NgxEditorJSComponent } from './editorjs.component';
import { EDITORJS_MODULE_IMPORT, EditorJSInstance } from '../../types/injector';
import { createModuleConfig } from '../../..';
import EditorJS from '@editorjs/editorjs';
import { createEditorJSInstance } from './editorjs.module';
import { NgxEditorjsPluginsModule } from '@tinynodes/ngx-editorjs-plugins';

describe('NgxEditorJSComponent', () => {
  @Component({
    template: `
      <ngx-editorjs [holder]="'test'"></ngx-editorjs>
    `
  })
  class TestHostComponent {
    @ViewChild(NgxEditorJSComponent)
    childComponent: NgxEditorJSComponent;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxEditorjsPluginsModule],
      declarations: [TestHostComponent, NgxEditorJSDirective, NgxEditorJSComponent],
      providers: [
        {
          provide: NgZone,
          useClass: MockNgZone
        },
        {
          provide: FOR_ROOT_OPTIONS_TOKEN,
          useValue: {}
        },
        {
          provide: NGX_EDITORJS_CONFIG,
          useFactory: createModuleConfig,
          deps: [FOR_ROOT_OPTIONS_TOKEN]
        },
        {
          provide: EDITORJS_MODULE_IMPORT,
          useValue: EditorJS
        },
        {
          provide: EditorJSInstance,
          useFactory: createEditorJSInstance,
          deps: [EDITORJS_MODULE_IMPORT]
        }
      ]
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(NgxEditorJSComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeDefined();
  });
});
