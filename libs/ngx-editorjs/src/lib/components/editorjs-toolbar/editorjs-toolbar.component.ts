import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NgxEditorJSService } from '../../services/editorjs.service';
import { take, filter, map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { PluginDefaults } from '../../types/plugins';

@Component({
  selector: 'ngx-editorjs-toolbar',
  templateUrl: 'editorjs-toolbar.component.html',
  styleUrls: ['editorjs-toolbar.component.scss']
})
export class NgxEditorJSToolbarComponent {
  /**
   * The holder of the Editor this toolbar is linked to
   */
  @Input()
  holder: string;

  private showBlocksValue = false;

  @Output()
  public showBlocks = new EventEmitter<boolean>();

  constructor(private readonly editorService: NgxEditorJSService) {}

  private generateBlockData(blockType: string) {
    switch (blockType) {
      case 'paragraph': {
        return {
          text: ''
        };
      }
      case 'header': {
        return {
          text: '',
          level: 1
        };
      }
      case 'code': {
        return {
          code: ''
        };
      }
      case 'list': {
        return {
          items: [],
          style: 'unordered'
        };
      }
    }
  }

  public get blockPlugins() {
    return this.editorService.plugins.pipe(
      map(pluginMap => {
        const blockPlugins = [];
        Object.entries(pluginMap).reduce((plugins, [key, pluginDefaults]) => {
          console.log(pluginDefaults);
          if (pluginDefaults.type === 'block') {
            return {
              ...plugins,
              [key]: Plugin
            };
          }
          return plugins;
        }, blockPlugins);
        return blockPlugins;
      }),
      tap(console.log)
    );
  }

  public addBlock(blockType: string, blockPosition?: number) {
    this.editorService
      .lastChange({ holder: this.holder })
      .pipe(take(1))
      .subscribe(outputData => {
        if (typeof blockPosition === 'undefined') {
          // Add block at end
          outputData.blocks.push({
            type: blockType,
            data: this.generateBlockData(blockType)
          });
        }
        this.editorService.update({ holder: this.holder, data: outputData });
      });
  }

  public toggleBlockOutlines() {
    this.showBlocksValue = !this.showBlocksValue;
    this.showBlocks.emit(this.showBlocksValue);
  }
}
