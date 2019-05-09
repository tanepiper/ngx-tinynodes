import { async, TestBed } from '@angular/core/testing';
import { NgxEditorjsDemoModule } from './ngx-editorjs-demo.module';

describe('NgxEditorjsDemoModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxEditorjsDemoModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgxEditorjsDemoModule).toBeDefined();
  });
});
