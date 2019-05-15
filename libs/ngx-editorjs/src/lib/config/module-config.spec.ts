import { EditorJSConfig } from '../types/config';
import { DEFAULT_HOLDER_ID } from './editor-config';
import { createModuleConfig } from './module-config';

describe('createModuleConfig', () => {
  it('should return a default config', () => {
    const config = createModuleConfig();

    expect(config).toStrictEqual({
      editorjs: {
        holder: DEFAULT_HOLDER_ID
      }
    });
  });

  it('should return a full config', () => {
    const time = Date.now();
    const inputConfig: EditorJSConfig = {
      autofocus: true,
      data: {
        blocks: [],
        time,
        version: 'test'
      },
      holder: 'test-holder',
      hideToolbar: true,
      initialBlock: 'paragraph',
      minHeight: 300,
      placeholder: 'Test',
      sanitizer: {}
    };
    const config = createModuleConfig({ editorjs: inputConfig });

    expect(config).toStrictEqual({
      editorjs: inputConfig
    });
  });

  it('should return a full config with default holder', () => {
    const time = Date.now();
    const inputConfig: EditorJSConfig = {
      autofocus: true,
      data: {
        blocks: [],
        time,
        version: 'test'
      },
      hideToolbar: true,
      initialBlock: 'paragraph',
      minHeight: 300,
      placeholder: 'Test',
      sanitizer: {}
    };
    const config = createModuleConfig({ editorjs: inputConfig });

    expect(config).toStrictEqual({
      editorjs: { ...inputConfig, holder: DEFAULT_HOLDER_ID }
    });
  });
});
