import { TestBed } from '@angular/core/testing';

import { NgxEditorJSPluginService } from './plugin-service.service';
import { EDITOR_JS_TOOL_INJECTOR, PLUGIN_CONFIG, PluginClasses, PluginTypes } from '../types/plugins';

import { createPluginConfig } from '../util/plugin';

class MockTool {
  render = () => {
  };
}

describe('PluginServiceService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        {
          provide: EDITOR_JS_TOOL_INJECTOR,
          useValue: MockTool,
          multi: true
        },
        {
          provide: PLUGIN_CONFIG,
          useValue: {
            key: 'test-1',
            type: PluginTypes.Block,
            pluginName: 'Test Block 1'
          },
          multi: true
        }, {
          provide: EDITOR_JS_TOOL_INJECTOR,
          useValue: MockTool,
          multi: true
        },
        {
          provide: PLUGIN_CONFIG,
          useValue: {
            key: 'test-2',
            type: PluginTypes.Block,
            pluginName: 'Test Block 2'
          },
          multi: true
        },
        {
          provide: PluginClasses,
          useFactory: createPluginConfig,
          deps: [ PLUGIN_CONFIG, EDITOR_JS_TOOL_INJECTOR ]
        }
      ]
    })
  );

  it('should be created', () => {
    const service: NgxEditorJSPluginService = TestBed.get(NgxEditorJSPluginService);
    expect(service).toBeTruthy();
  });

  it('should have a plugin called test', () => {
    const service: NgxEditorJSPluginService = TestBed.get(NgxEditorJSPluginService);
    const plugin = service.getPlugin('test');
    expect(plugin).toBeDefined();
    expect(plugin.key).toBe('test');
  });
});
