import { async, TestBed } from '@angular/core/testing';
import { NgxEditorjsPluginsModule } from './ngx-editorjs-plugins.module';

describe('NgxEditorjsPluginsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxEditorjsPluginsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgxEditorjsPluginsModule).toBeDefined();
  });
});
