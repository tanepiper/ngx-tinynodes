import { async, TestBed } from '@angular/core/testing';
import { NgxEditorJSModule } from './ngx-editorjs.module';

describe('NgxEditorJSModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxEditorJSModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgxEditorJSModule).toBeDefined();
  });
});
