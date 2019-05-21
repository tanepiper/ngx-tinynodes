import { TestBed } from '@angular/core/testing';
import { MockEditorJS } from '../testing/shared';
import { createEditorJSInstance, NgxEditorJSModule } from './ngx-editorjs.module';

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
    const editor = createEditorJSInstance(MockEditorJS);
    expect(editor).toBe(MockEditorJS);
  });
});
