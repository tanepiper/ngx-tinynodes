import { NgZone } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { MockNgZone } from '../../testing/ng-zone-mock';
import { MockEditorJS, MockPlugin } from '../../testing/shared';
import { EDITIOR_JS_INSTANCE, NGX_EDITORJS_CONFIG } from '../types/config';
import { UserPlugins } from '../types/plugins';
import { NgxEditorJSService } from './editorjs.service';
import { NgxEditorJSPluginService } from './plugins.service';

describe('NgxEditorJSService', () => {
  let service: NgxEditorJSService;
  let onDestroy$: Subject<boolean>;

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

    service = TestBed.get(NgxEditorJSService);
  }));

  it('should create an instance of the EditorJS service', () => {
    expect(service).toBeDefined();
  });

  it('should create an instance of EditorJS', () => {
    const holder = 'test-editor';
    service.createEditor({ holder });
    const editor = service.getEditor(holder);
    expect(editor).toBeDefined();
  });

  it('should create a ready instance', done => {
    const holder = 'test-editor';

    service
      .isReady(holder)
      .pipe(
        distinctUntilChanged(),
        filter(isReady => isReady),
        takeUntil(onDestroy$)
      )
      .subscribe(isReady => {
        expect(isReady).toBeTruthy();
        done();
      });

    service.createEditor({ holder });
  });

  it('should trigger a change on update', done => {
    const holder = 'test-editor';

    service
      .hasChanged(holder)
      .pipe(
        distinctUntilChanged(),
        filter(hasChanged => hasChanged !== 0),
        takeUntil(onDestroy$)
      )
      .subscribe(hasChanged => {
        expect(hasChanged).toBeTruthy();
        done();
      });

    service.createEditor({ holder });
    service.update(holder, [{ type: 'test', data: { text: 'Test' } }]);
  });

  it('should trigger a change on save', done => {
    const holder = 'test-editor';

    service
      .hasChanged(holder)
      .pipe(
        distinctUntilChanged(),
        filter(hasChanged => hasChanged !== 0),
        takeUntil(onDestroy$)
      )
      .subscribe(hasChanged => {
        expect(hasChanged).toBeTruthy();
        done();
      });

    service.createEditor({ holder });
    service.save(holder);
  });
});
