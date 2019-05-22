import { ToolSettings } from '@editorjs/editorjs';
import { BasePlugin } from '../lib/types/plugins';
import { NgxEditorJSModuleConfig } from '../lib/types/config';

export class TestClass {
  constructor() {}
  render() {
    return document.createElement('div');
  }
}

export class MockPlugin implements BasePlugin {
  public plugin(): ToolSettings {
    return { class: TestClass };
  }
  shortcut() {
    return 'test-shortcut';
  }
}

export class MockEditorJS {
  blocks: any;
  saver: any;
  version: string;
  destroy: () => void;

  isReady: Promise<void>;

  constructor(private config: NgxEditorJSModuleConfig) {
    this.version = 'test';

    this.isReady = Promise.resolve();

    this.destroy = () => {};

    this.blocks = {
      clear: () => {},
      render: () => {}
    };

    this.saver = {
      save: (): Promise<any> => {
        return Promise.resolve({
          time: Date.now(),
          version: 'test',
          blocks: []
        });
      }
    };
    (config as any).onReady();
  }
}
