import { Component, NgZone, ViewChild } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { MockNgZone } from '@tinynodes/ngx-editorjs/src/testing/ng-zone-mock';
import { MockEditorJS, MockPlugin } from '@tinynodes/ngx-editorjs/src/testing/shared';
import { NgxEditorJSDirective } from '../../directives/ngx-editorjs.directive';
import { NgxEditorJSService } from '../../services/editorjs.service';
import { NgxEditorJSPluginService } from '../../services/plugins.service';
import { NGX_EDITORJS_CONFIG } from '../../types/config';
import { UserPlugins } from '../../types/plugins';
import { NgxEditorJSComponent } from './editorjs.component';
import { EDITORJS_MODULE_IMPORT, EditorJSInstance } from '../../types/injector';

describe('NgxEditorJSComponent', () => {
  @Component({
    template: `
      <ngx-editorjs></ngx-editorjs>
    `
  })
  class TestHostComponent {
    @ViewChild(NgxEditorJSComponent, /* TODO: add static flag */ {})
    childComponent: NgxEditorJSComponent;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent, NgxEditorJSDirective, NgxEditorJSComponent],
      providers: [
        {
          provide: NGX_EDITORJS_CONFIG,
          useValue: {}
        },
        {
          provide: UserPlugins,
          useValue: {
            paragraph: new MockPlugin(),
            header: new MockPlugin()
          }
        },
        {
          provide: NgxEditorJSPluginService,
          useClass: NgxEditorJSPluginService
        },
        {
          provide: NgZone,
          useClass: MockNgZone
        },
        {
          provide: NgxEditorJSService,
          useClass: NgxEditorJSService
        },
        {
          provide: EDITORJS_MODULE_IMPORT,
          useValue: MockEditorJS
        },
        {
          provide: EditorJSInstance,
          useFactory: function create(editorjs: any) {
            return editorjs;
          },
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
