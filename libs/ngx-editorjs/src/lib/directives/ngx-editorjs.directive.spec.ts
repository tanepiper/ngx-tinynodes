import { Component, DebugElement, EventEmitter, NgZone, SimpleChanges } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockNgZone } from '../../testing/ng-zone-mock';
import { MockEditorJS, MockPlugin } from '../../testing/shared';
import { NgxEditorJSService } from '../services/editorjs.service';
import { NgxEditorJSPluginService } from '../services/plugins.service';
import { Block } from '../types/blocks';
import { EDITIOR_JS_INSTANCE, NGX_EDITORJS_CONFIG } from '../types/config';
import { UserPlugins } from '../types/plugins';
import { NgxEditorJSDirective } from './ngx-editorjs.directive';

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

  const blocks: Block[] = [
    {
      type: 'test',
      data: {
        text: 'test'
      }
    }
  ];

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
    expect(directive).toBeDefined();
  });

  it('should provide the editor instance', () => {
    expect(directive.editor).toBeInstanceOf(MockEditorJS);
  });

  it('should provide the service instance', () => {
    expect(directive.service).toBeInstanceOf(NgxEditorJSService);
  });

  it('should update the service when changes are detected', () => {
    spyOn(directive.service, 'update');

    const changes: SimpleChanges = {
      blocks: {
        firstChange: false,
        previousValue: [],
        currentValue: blocks,
        isFirstChange: () => false
      }
    };
    directive.ngOnChanges(changes);
    expect(directive.service.update).toHaveBeenCalledWith('my-editor', blocks);
  });

  it('should create a new instance when another property is changed', () => {
    spyOn(directive, 'createEditor');

    const changes: SimpleChanges = {
      autofocus: {
        firstChange: false,
        previousValue: false,
        currentValue: true,
        isFirstChange: () => false
      }
    };
    directive.autofocus = true;
    directive.ngOnChanges(changes);

    expect(directive.createEditor).toHaveBeenCalledWith({
      autofocus: true,
      holder: 'my-editor'
    });
  });
});
