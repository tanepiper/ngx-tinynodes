import { NgZone } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { MockNgZone } from '../../testing/ng-zone-mock';
import { MockEditorJS, MockPlugin } from '../../testing/shared';
import { NGX_EDITORJS_CONFIG } from '../types/config';
import { UserPlugins } from '../types/plugins';
import { NgxEditorJSInstanceService } from './editorjs-instance.service';
import { NgxEditorJSService } from './editorjs.service';
import { NgxEditorJSPluginService } from './plugins.service';
import { EDITORJS_MODULE_IMPORT, EditorJSInstance } from '../types/injector';

describe('NgxEditorJSService', () => {
  let service: NgxEditorJSService;
  let onDestroy$: Subject<boolean>;

  const holder = 'test-holder';

  beforeEach(async(() => {
    onDestroy$ = new Subject<boolean>();

    TestBed.configureTestingModule({
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
          provide: NgxEditorJSInstanceService,
          useClass: NgxEditorJSInstanceService
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

    service = TestBed.get(NgxEditorJSService);
    service.createEditor({ config: { holder } });
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

    service.createEditor({ config: { holder } });
  });

  it('should trigger a change on update', done => {
    service
      .hasChanged({ holder })
      .pipe(
        distinctUntilChanged(),
        filter(hasChanged => hasChanged.time !== 0),
        takeUntil(onDestroy$)
      )
      .subscribe(hasChanged => {
        expect(hasChanged).toBeTruthy();
        done();
      });

    service.createEditor({ config: { holder } });
    service.update({ holder, blocks: [{ type: 'test', data: { text: 'Test' } }] });
  });

  it('should trigger a change on save', done => {
    service
      .hasChanged({ holder })
      .pipe(takeUntil(onDestroy$))
      .subscribe(hasChanged => {
        expect(hasChanged).toBeDefined();
        done();
      });

    service.createEditor({ config: { holder } });
    service.save({ holder });
  });
});
