import { Injectable } from '@angular/core';
import Paragraph from '@editorjs/paragraph';
import { ToolSettings } from '@editorjs/editorjs';
import { BasePlugin } from '../../types/plugins';

@Injectable()
export class PluginParagraph implements BasePlugin {
  public plugin(): ToolSettings {
    return Paragraph;
  }
}
