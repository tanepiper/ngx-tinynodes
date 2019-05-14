import { async, TestBed } from '@angular/core/testing';
import { NgxEditorJSModule, editorJSInstance } from './ngx-editorjs.module';
import EditorJS from '@editorjs/editorjs';
import { MockEditorJS } from '../testing/shared';

describe('NgxEditorJSModule', () => {
  let module;

  it('should create from a module import', () => {
    TestBed.configureTestingModule({
      imports: [NgxEditorJSModule]
    }).compileComponents();

    module = TestBed.get(NgxEditorJSModule);

    expect(NgxEditorJSModule).toBeDefined();
  });

  it('should create from a forRoot import', () => {
    TestBed.configureTestingModule({
      imports: [NgxEditorJSModule.forRoot()]
    }).compileComponents();

    expect(NgxEditorJSModule).toBeDefined();
  });

  it('should return EditorJS when calling the factory function', () => {
    const editor = editorJSInstance(MockEditorJS);
    expect(editor).toBe(MockEditorJS);
  });
});
