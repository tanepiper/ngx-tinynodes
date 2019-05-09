import { async, TestBed } from '@angular/core/testing';
import { NgxEditorjsModule } from './ngx-editorjs.module';

describe('NgxEditorjsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxEditorjsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgxEditorjsModule).toBeDefined();
  });
});
