import { Inject, Injectable } from '@angular/core';
import EditorJS, { EditorConfig } from '@editorjs/editorjs';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Block } from '../types/blocks';
import { NgxEditorJSConfig, NGX_EDITORJS_CONFIG } from '../types/config';
import { CreateEditorJSOptions, EditorJSAction, EditorJSActionTypes } from '../types/editorjs-service';
import { InjectorMethodOption } from '../types/injector';
import { NgxEditorJSInstanceService } from './editorjs-injector';
import { NgxEditorJSPluginService } from './plugins.service';

/**
 * The NgxEditorJSService provides control EditorJS instances via Angular.
 */
@Injectable({
  providedIn: 'root'
})
export class NgxEditorJSService {
  private onDestroy$ = new Subject<boolean>();
  /**
   * Internal editor action state
   */
  private readonly editorActions$ = new BehaviorSubject<EditorJSAction>({
    action: ''
  });

  /**
   * Editor action stream
   */
  public get editorActions() {
    return this.editorActions$.pipe(filter(action => action.action !== ''));
  }

  constructor(
    @Inject(NGX_EDITORJS_CONFIG) private config: NgxEditorJSConfig,
    private readonly editorService: NgxEditorJSInstanceService,
    private readonly plugins: NgxEditorJSPluginService
  ) {
    this.editorActions.pipe(takeUntil(this.onDestroy$)).subscribe(editorAction => {
      switch (editorAction.action) {
        case EditorJSActionTypes.CreateEditor: {
          return this.createEditor(editorAction.payload);
        }
        case EditorJSActionTypes.ClearEditor: {
          return this.clear(editorAction.payload);
        }
        case EditorJSActionTypes.DestroyEditor: {
          return this.destroy(editorAction.payload);
        }
        case EditorJSActionTypes.SaveEditor: {
          return this.save(editorAction.payload);
        }
        case EditorJSActionTypes.UpdateEditor: {
          return this.update(editorAction.payload);
        }
        default: {
          return;
        }
      }
    });
  }

  /**
   * This method creates a new EditorJS instance
   * @param holder The ID of the holder of the instance
   * @param blocks Optional initial set of blocks to render in the editor
   * @param excludeTools String array of keys to not include with this editor
   * @param autoSave When an instance changes we update the block map, set to false if you want to disable
   */
  public async createEditor(options: CreateEditorJSOptions): Promise<void> {
    const editorConfig: EditorConfig = {
      ...this.config.editorjs,
      ...options.config,
      tools: this.plugins.getTools(options.includeTools)
    };

    await this.editorService.createInstance({ editorConfig });
  }

  /**
   * Get an `EditorJS` instance
   * See the [EditorJS API](https://editorjs.io/api) docs for more details
   * @param holder The ID of the holder of the instance
   */
  public getEditor({ holder }: InjectorMethodOption): Observable<EditorJS> {
    return this.editorService.getInstance({ holder }).pipe(filter(editor => typeof editor !== 'undefined'));
  }

  /**
   * Get an observable of the blocks for an `EditorJS` instance
   * @param holder The ID of the holder of the instance
   */
  public getBlocks({ holder }: InjectorMethodOption): Observable<Block[]> {
    return this.editorService.getBlocks({ holder });
  }

  /**
   * Returns an `Observable<boolean>` of the current ready state, this can be subscribed to before calling
   * the `createEditor` method
   * @param holder
   */
  public isReady({ holder }: InjectorMethodOption): Observable<boolean> {
    return this.editorService.getReady({ holder });
  }

  /**
   * Returns an `Observable<number>` of the current timestamp of the last change
   * this can be subscribed to before calling the `createEditor` method
   * @param holder
   */
  public getChanged({ holder }: InjectorMethodOption): Observable<Block[]> {
    return this.editorService.getChanged({ holder });
  }

  /**
   * Check to see if the `EditorJS` instance has changed
   * @param holder The ID of the holder of the instance
   */
  public hasChanged({ holder }: InjectorMethodOption) {
    this.editorService.onChange({ holder });
  }

  /**
   * This method updates the blocks within the `EditorJS` instance.
   * If there is no instance of that name it will throw an error.
   * @param holder The ID of the holder of the instance
   * @param blocks The array of `Block` elements to render
   */
  public update({ holder, blocks }: InjectorMethodOption) {
    this.editorService.update({ holder, blocks });
  }

  /**
   * Calls the `EditorJS` save method which returns an `OutputData` object.
   * From this the service updates the blocks map and change map values
   * If there is no instance of that name it will throw an error.
   * @param holder The ID of the holder of the instance
   */
  public save({ holder }: InjectorMethodOption): void {
    this.editorService.save({ holder });
  }

  /**
   * Clears all blocks from an `EditorJS instance`
   * @param holder The ID of the holder of the instance
   */
  public clear({ holder }: InjectorMethodOption): void {
    this.editorService.clear({ holder });
  }

  /**
   * Destroy the `EditorJS` instance
   * It also calls the maps and sets their values back to their defaults and then
   * completes and destroys them
   * @param holder The ID of the holder of the instance
   */
  public destroy({ holder }: InjectorMethodOption): void {
    this.editorService.destroyInstance({ holder });
  }
}
