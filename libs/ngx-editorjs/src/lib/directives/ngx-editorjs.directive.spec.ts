import { EventEmitter, NgZone, DebugElement, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { NGX_EDITORJS_CONFIG, EDITIOR_JS_INSTANCE } from '../types/config';
import { UserPlugins } from '../types/plugins';
import { MockPlugin, MockEditorJS } from '../../testing/shared';
import { NgxEditorJSPluginService } from '../services/plugins.service';
import { MockNgZone } from '../../testing/ng-zone-mock';
import { NgxEditorJSService } from '../services/editorjs.service';
import { NgxEditorJSDirective } from './ngx-editorjs.directive';
import { By } from '@angular/platform-browser';

describe('NgxEditorJSDirective', () => {
  @Component({
    selector: 'mock-component',
    template: `
      <div id="my-editor" ngxEditorJS></div>
    `
  })
  class MockComponent {
    change = new EventEmitter<any>();
  }

  let fixture: ComponentFixture<MockComponent>;
  let componentInstance: MockComponent;
  let directiveElement: DebugElement;
  let directive: NgxEditorJSDirective;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxEditorJSDirective, MockComponent],
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

    fixture = TestBed.createComponent(MockComponent);
    componentInstance = fixture.componentInstance;
    fixture.detectChanges();
    directiveElement = fixture.debugElement.query(By.directive(NgxEditorJSDirective));
    directive = directiveElement.injector.get<NgxEditorJSDirective>(NgxEditorJSDirective);
  }));

  it('should create the directive on the component', () => {
    expect(directiveElement).toBeDefined();
    expect(directive).toBeDefined();
  });
});
