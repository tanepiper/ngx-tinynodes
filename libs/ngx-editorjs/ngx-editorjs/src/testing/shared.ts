import { NgxEditorJSModuleConfig } from '../lib/types/config';

export class MockPlugin {
  constructor() {}
  render() {
    return document.createElement('div');
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
