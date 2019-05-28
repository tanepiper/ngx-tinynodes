import { TestBed } from '@angular/core/testing';

import { NgxEditorJSPluginService } from './plugin-service.service';
import {
  createPluginConfig,
  EDITOR_JS_TOOL_INJECTOR,
  PLUGIN_CONFIG,
  PluginClasses,
  PluginTypes
} from '@tinynodes/ngx-editorjs-plugins';

class MockTool {
  render = () => {}
}

describe('PluginServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{
      provide: EDITOR_JS_TOOL_INJECTOR,
      useValue: MockTool,
      multi: true
    }, {
      provide: PLUGIN_CONFIG,
      useValue: {
        key: 'test',
        type: PluginTypes.Block,
        pluginName: 'Test Block'
      },
      multi: true
    }, {
      provide: PluginClasses,
      useFactory: createPluginConfig,
      deps: [PLUGIN_CONFIG, EDITOR_JS_TOOL_INJECTOR]
    }]
  }));

  it('should be created', () => {
    const service: NgxEditorJSPluginService = TestBed.get(NgxEditorJSPluginService);
    expect(service).toBeTruthy();
  });

  it('should have a plugin called test', () => {
    const service: NgxEditorJSPluginService = TestBed.get(NgxEditorJSPluginService);
    const plugin = service.getPlugin('test');
    expect(plugin.key).toBe('test')
  })
});
