import { ToolSettings } from '@editorjs/editorjs';
import { BasePlugin } from '../../types/plugins';

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
