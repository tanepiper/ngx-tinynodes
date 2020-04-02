import { NgZone } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { MockNgZone } from '../../testing/ng-zone-mock';
import { FOR_ROOT_OPTIONS_TOKEN, NGX_EDITORJS_CONFIG } from '../types/config';
import { NgxEditorJSService } from './editorjs.service';
import {
  createPluginConfig,
  EDITOR_JS_TOOL_INJECTOR,
  NgxEditorjsPluginsModule,
  PLUGIN_CONFIG,
  PluginClasses,
} from '@tinynodes/ngx-editorjs-plugins';
import { EDITORJS_MODULE_IMPORT, EditorJSInstance } from '../types/injector';
import { createModuleConfig } from '../..';
import EditorJS from '@editorjs/editorjs';
import { createEditorJSInstance } from '../containers/editorjs/editorjs.module';

describe('NgxEditorJSService', () => {
  let service: NgxEditorJSService;
  let onDestroy$: Subject<boolean>;

  const holder = 'test-holder';

  beforeEach(async(() => {
    onDestroy$ = new Subject<boolean>();

    TestBed.configureTestingModule({
      imports: [NgxEditorjsPluginsModule],
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
          provide: PluginClasses,
          useFactory: createPluginConfig,
          deps: [PLUGIN_CONFIG, EDITOR_JS_TOOL_INJECTOR],
        },
        {
          provide: NgZone,
          useClass: MockNgZone,
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

  it('should create a ready instance', (done) => {
    service
      .isReady({ holder })
      .pipe(
        distinctUntilChanged(),
        filter((isReady) => isReady),
        takeUntil(onDestroy$)
      )
      .subscribe((isReady) => {
        expect(isReady).toBeTruthy();
        done();
      });

    service.createInstance({ config: { holder } });
  });

  it('should trigger a change on update', (done) => {
    service
      .lastChange({ holder })
      .pipe(
        distinctUntilChanged(),
        filter((hasChanged) => hasChanged.time !== 0),
        takeUntil(onDestroy$)
      )
      .subscribe((hasChanged) => {
        expect(hasChanged).toBeTruthy();
        done();
      });

    service.createInstance({ config: { holder } });
    service.update({ holder, data: { blocks: [{ type: 'test', data: { text: 'Test' } }] } }).subscribe();
  });

  it('should trigger a change on save', (done) => {
    service
      .lastChange({ holder })
      .pipe(takeUntil(onDestroy$))
      .subscribe((hasChanged) => {
        expect(hasChanged).toBeDefined();
        done();
      });

    service.createInstance({ config: { holder } });
    service.save({ holder });
  });
});
