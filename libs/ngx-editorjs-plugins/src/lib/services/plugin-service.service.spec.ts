import { TestBed } from '@angular/core/testing';

import { NgxEditorJSPluginService } from './plugin-service.service';

describe('PluginServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxEditorJSPluginService = TestBed.get(NgxEditorJSPluginService);
    expect(service).toBeTruthy();
  });
});
