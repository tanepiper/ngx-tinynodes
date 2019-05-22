import { Inject, Injectable } from '@angular/core';
import EditorJS, { EditorConfig, OutputData } from '@editorjs/editorjs';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NgxEditorJSConfig, NGX_EDITORJS_CONFIG } from '../types/config';
import { CreateEditorJSOptions } from '../types/editorjs-service';
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
  constructor(
    @Inject(NGX_EDITORJS_CONFIG) private config: NgxEditorJSConfig,
    private readonly instanceService: NgxEditorJSInstanceService,
    private readonly plugins: NgxEditorJSPluginService
  ) {}

  /**
   * This method creates a new EditorJS instance
   * @param options The instance options
   */
  public async createEditor(options: CreateEditorJSOptions): Promise<void> {
    const editorConfig: EditorConfig = {
      ...this.config.editorjs,
      ...options.config,
      tools: this.plugins.getTools(options.includeTools)
    };

    await this.instanceService.createInstance({ editorConfig });
  }

  /**
   * Get an `EditorJS` instance
   * See the [EditorJS API](https://editorjs.io/api) docs for more details
   * @param holder The ID of the holder of the instance
   */
  public getEditor(options: InjectorMethodOption): Observable<EditorJS> {
    return this.instanceService.getEditor(options).pipe(filter(editor => typeof editor !== 'undefined'));
  }

  /**
   * Returns an `Observable<boolean>` of the current ready state, this can be subscribed to before calling
   * the `createEditor` method
   * @param holder
   */
  public isReady(options: InjectorMethodOption): Observable<boolean> {
    return this.instanceService.isReady(options);
  }

  /**
   * Returns an `Observable<number>` of the current timestamp of the last change
   * this can be subscribed to before calling the `createEditor` method
   * @param holder
   */
  public hasChanged(options: InjectorMethodOption): Observable<OutputData> {
    return this.instanceService.hasChanged(options);
  }

  /**
   * This method updates the blocks within the `EditorJS` instance.
   * If there is no instance of that name it will throw an error.
   * @param options The options to update
   * @param triggerUpdate If set to false the hasChanged observable won't be updated
   */
  public update(options: InjectorMethodOption, triggerUpdate = true) {
    this.instanceService.update(options, triggerUpdate);
  }

  /**
   * Calls the `EditorJS` save method which returns an `OutputData` object.
   * From this the service updates the blocks map and change map values
   * If there is no instance of that name it will throw an error.
   * @param holder The ID of the holder of the instance
   */
  public save(options: InjectorMethodOption): void {
    this.instanceService.save(options);
  }

  /**
   * Clears all blocks from an `EditorJS instance`
   * @param holder The ID of the holder of the instance
   */
  public clear(options: InjectorMethodOption): void {
    this.instanceService.clear(options);
  }

  /**
   * Destroy the `EditorJS` instance
   * It also calls the maps and sets their values back to their defaults and then
   * completes and destroys them
   * @param holder The ID of the holder of the instance
   */
  public destroy(options: InjectorMethodOption): void {
    this.instanceService.destroyInstance(options);
  }
}
