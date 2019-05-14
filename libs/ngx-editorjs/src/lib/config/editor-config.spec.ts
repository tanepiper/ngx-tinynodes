import { createEditorJSConfig, DEFAULT_HOLDER_ID } from './editor-config';
import { EditorJSConfig } from '../types/config';

describe('createEditorJSConfig', () => {
  it('should return a default config', () => {
    const config = createEditorJSConfig();

    expect(config).toStrictEqual({
      holder: DEFAULT_HOLDER_ID
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
      hideToolbar: true,
      holder: 'test-holder',
      initialBlock: 'paragraph',
      minHeight: 300,
      placeholder: 'Test',
      sanitizer: {}
    };
    const config = createEditorJSConfig(inputConfig);

    expect(config).toStrictEqual(inputConfig);
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
    const config = createEditorJSConfig(inputConfig);

    expect(config).toStrictEqual({ ...inputConfig, holder: DEFAULT_HOLDER_ID });
  });
});
