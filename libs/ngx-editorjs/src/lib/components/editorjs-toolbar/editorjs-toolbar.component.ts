import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { NgxEditorJSService } from '../../services/editorjs.service';
import { Block } from '../../types/blocks';
import { PluginDefaultsMaps } from '../../types/plugins';

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

  @Input()
  resetBlocks: Block[];

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
      map((pluginMap: PluginDefaultsMaps) =>
        Object.entries(pluginMap).reduce((plugins, [key, pluginDefaults]) => {
          if (pluginDefaults.type === 'block') {
            plugins.push(pluginDefaults);
          }
          return plugins;
        }, [])
      )
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
  /**
   * Call the editor save method
   */

  public save() {
    this.editorService.save({ holder: this.holder });
  }

  /**
   * Clear the editor
   */
  public clear() {
    this.editorService.clear({ holder: this.holder });
  }

  public reset(blocks: Block[]) {
    this.editorService.update({
      holder: this.holder,
      data: {
        time: Date.now(),
        blocks
      }
    });
  }
}
