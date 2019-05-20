import { Component, DebugElement, NgZone, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockNgZone } from '@tinynodes/ngx-editorjs/src/testing/ng-zone-mock';
import { MockEditorJS, MockPlugin } from '@tinynodes/ngx-editorjs/src/testing/shared';
import { NgxEditorJSDirective } from '../../directives/ngx-editorjs.directive';
import { NgxEditorJSService } from '../../services/editorjs.service';
import { NgxEditorJSPluginService } from '../../services/plugins.service';
import { EDITIOR_JS_INSTANCE, NGX_EDITORJS_CONFIG } from '../../types/config';
import { UserPlugins } from '../../types/plugins';
import { NgxEditorJSComponent } from './editorjs.component';

describe('NgxEditorJSComponent', () => {
  let fixture: ComponentFixture<NgxEditorJSComponent>;
  let componentInstance: NgxEditorJSComponent;
  let componentEl: DebugElement;
  let component: NgxEditorJSComponent;

  @Component({
    template: `
      <ngx-editorjs></ngx-editorjs>
    `
  })
  class TestHostComponent {
    @ViewChild(NgxEditorJSComponent)
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
          provide: EDITIOR_JS_INSTANCE,
          useValue: MockEditorJS
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
