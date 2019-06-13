import { NgZone } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { MockNgZone } from '../../testing/ng-zone-mock';
import { MockPlugin } from '../../testing/shared';
import { NGX_EDITORJS_CONFIG } from '../types/config';
import { NgxEditorJSService } from './editorjs.service';
import {
  createPluginConfig,
  EDITOR_JS_TOOL_INJECTOR,
  NgxEditorJSPluginService,
  NgxPluginServiceModule,
  PLUGIN_CONFIG,
  PluginClasses,
  PluginTypes
} from '@tinynodes/ngx-editorjs-plugins';

describe('NgxEditorJSService', () => {
  let service: NgxEditorJSService;
  let onDestroy$: Subject<boolean>;

  const holder = 'test-holder';

  beforeEach(async(() => {
    onDestroy$ = new Subject<boolean>();

    TestBed.configureTestingModule({
      imports: [ NgxPluginServiceModule ],
      providers: [
        {
          provide: NGX_EDITORJS_CONFIG,
          useValue: {}
        },
        {
          provide: EDITOR_JS_TOOL_INJECTOR,
          useValue: MockPlugin,
          multi: true
        },
        {
          provide: PLUGIN_CONFIG,
          useValue: {
            key: 'plugin',
            type: PluginTypes.Block,
            pluginName: 'EditorJS Mock Block Plugin'
          },
          multi: true
        },
        {
          provide: PluginClasses,
          useFactory: createPluginConfig,
          deps: [ PLUGIN_CONFIG, EDITOR_JS_TOOL_INJECTOR ]
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
        }
      ]
    }).compileComponents();

    service = TestBed.get(NgxEditorJSService);
    service.createInstance({ config: { holder } });
  }));

  it('should create an instance of the EditorJS service', () => {
    expect(service).toBeDefined();
  });

  it('should create an instance of EditorJS', () => {
    const editor = service.getEditor({ holder });
    expect(editor).toBeDefined();
  });

  it('should create a ready instance', done => {
    service
      .isReady({ holder })
      .pipe(
        distinctUntilChanged(),
        filter(isReady => isReady),
        takeUntil(onDestroy$)
      )
      .subscribe(isReady => {
        expect(isReady).toBeTruthy();
        done();
      });

    service.createInstance({ config: { holder } });
  });

  it('should trigger a change on update', done => {
    service
      .lastChange({ holder })
      .pipe(
        distinctUntilChanged(),
        filter(hasChanged => hasChanged.time !== 0),
        takeUntil(onDestroy$)
      )
      .subscribe(hasChanged => {
        expect(hasChanged).toBeTruthy();
        done();
      });

    service.createInstance({ config: { holder } });
    service.update({ holder, data: { blocks: [ { type: 'test', data: { text: 'Test' } } ] } }).subscribe();
  });

  it('should trigger a change on save', done => {
    service
      .lastChange({ holder })
      .pipe(takeUntil(onDestroy$))
      .subscribe(hasChanged => {
        expect(hasChanged).toBeDefined();
        done();
      });

    service.createInstance({ config: { holder } });
    service.save({ holder });
  });
});
