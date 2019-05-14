import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { NgxEditorJSComponent } from './editorjs.component';
import { NgxEditorJSDirective } from '../../directives/ngx-editorjs.directive';
import { NGX_EDITORJS_CONFIG, EDITIOR_JS_INSTANCE } from '../../types/config';
import { UserPlugins } from '../../types/plugins';
import { MockPlugin, MockEditorJS } from '@tinynodes/ngx-editorjs/src/testing/shared';
import { NgxEditorJSPluginService } from '../../services/plugins.service';
import { NgZone, DebugElement, Component, ViewChild } from '@angular/core';
import { MockNgZone } from '@tinynodes/ngx-editorjs/src/testing/ng-zone-mock';
import { NgxEditorJSService } from '../../services/editorjs.service';
import { By } from '@angular/platform-browser';

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
