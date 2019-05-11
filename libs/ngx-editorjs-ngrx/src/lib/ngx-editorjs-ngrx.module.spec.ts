import { async, TestBed } from '@angular/core/testing';
import { NgxEditorjsNgrxModule } from './ngx-editorjs-ngrx.module';

describe('NgxEditorjsNgrxModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxEditorjsNgrxModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgxEditorjsNgrxModule).toBeDefined();
  });
});
