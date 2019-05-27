import { ApplicationRef, Inject, Injectable, NgZone } from '@angular/core';
import { EditorConfig, OutputData } from '@editorjs/editorjs';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, switchMap, take, takeUntil, tap, distinctUntilChanged } from 'rxjs/operators';
import { EditorJSInstanceService } from './editorjs-instance';
import { NgxEditorJSModuleConfig, NGX_EDITORJS_CONFIG } from '../types/config';
import { CreateEditorJSOptions } from '../types/editorjs-service';
import {
  EditorJSClass,
  EDITORJS_INSTANCE,
  InjectorApiCallOptions,
  InjectorApiCallResponse,
  InjectorMethodOption
} from '../types/injector';
import { PluginMap, ToolSettingsMap, UserPlugins } from '../types/plugins';
import { Block } from '../types/blocks';
import { ReadyMap, ChangeMap } from '../types/maps';

/**
 * The NgxEditorJSService handles the management of EditorJS instances, plugins and lifecycle observables
 * All EditorJS instances are created outside of Angular using `NgZone` to ensure change detection is not triggered.
 * Once an instance is created, several `Observable` values are also set up:
 *
 *  - Editor `isReady` state - Set when the editor instance is ready in the DOM
 *  - Editor `hasSaved` state - Set when the editor `.save()` method has been called.
 *  - Editor `hasChanged` state - Set when a change happens, contains the `OutputData` from the Editor.
 *
 * After setup when `isReady` is true the editor can be used within Angular.  There are some methods provided
 * for save, update and clear - and an `apiCall` method which allows for any call to be made to EditorJS that matches
 * it's API.
 */
@Injectable({
  providedIn: 'root'
})
export class NgxEditorJSService {
  /**
   * Internal cache of all the available plugins
   */
  private plugins$ = new BehaviorSubject<PluginMap>({});

  /**
   * Get the plugin defaults, which includes the constructor
   */
  public get plugins() {
    return this.plugins$.asObservable();
  }

  /**
   * When the `NgxEditorJSService` is initialized any plugins passed in via the `UserPlugin` are set on the service plugin map
   *
   * @param editorJs The EditorJS class injected into the application and used to create new editor instances
   * @param config the Module config
   * @param userPlugins The Plugin map passed from the module configuration
   * @param zone The Angular Zone service that allows the EditorJS methods to be run outside of Angular
   * @param ref The ApplicationRef provided by Angular, used to trigger an application tick
   */
  constructor(
    @Inject(EDITORJS_INSTANCE) private readonly editorJs: EditorJSClass,
    @Inject(NGX_EDITORJS_CONFIG) private readonly config: NgxEditorJSModuleConfig,
    @Inject(UserPlugins) private readonly userPlugins: PluginMap,
    private readonly editorInstance: EditorJSInstanceService
  ) {
    this.plugins$.next(this.userPlugins);
  }

  /**
   * Creates a new EditorJS instance outside of the Angular zone and then adds it to the editor instances
   * This method should be called with `await` to ensure the editor is fully initialized
   * @param options The options to pass to the method for creating an EditorJS instance
   */
  public createInstance(options: CreateEditorJSOptions): void {
    this.getTools(options.includeTools)
      .pipe(take(1))
      .subscribe(async tools => {
        const editorConfig: EditorConfig = {
          ...this.config.editorjs,
          ...options.config,
          tools
        };
        editorConfig.onChange = (editorConfig.onChange && typeof editorConfig.onChange === 'function'
          ? editorConfig.onChange
          : this.createOnChange.call(this, { holder: editorConfig.holder as string })) as any;
        editorConfig.onReady =
          editorConfig.onReady && typeof editorConfig.onReady === 'function'
            ? editorConfig.onReady
            : this.createOnReady.call(this, { holder: editorConfig.holder as string });

        await this.editorInstance.createInstance(editorConfig);
      });

    this.editorInstance.apiCallStream(options.config.holder as string).subscribe(apiResponse => {
      console.log(apiResponse);
    });
  }

  /**
   * Internal method to create an default onChange method for `EditorJS`
   * @param options The InjectorMethodOption for this request
   */
  private createOnChange(options: InjectorMethodOption): (change: OutputData) => void {
    const onChange = (data: OutputData) => {
      if (!data) {
        return;
      }
      this.update({ ...options, data });
    };
    return onChange;
  }

  /**
   * Internal method to create an default onReady method for `EditorJS`
   * @param options The InjectorMethodOption for this request
   */
  private createOnReady(options: InjectorMethodOption): () => void {
    const onReady = () => {
      this.setIsReady(options.holder, true);
    };
    return onReady;
  }

  /**
   * A helper method to make calls to any EditorJS API (see [API Docs](https://editorjs.io/api))
   * The first argument is an object that you must pass the `method` name, and the `holder` ID of the container.
   * An optional `namespace` can be added for API calls such as `blocks`, `caret`, etc.
   * The second argument is any additional arguments as required by the API.
   *
   * Unlike other methods an API call be made with a `.subscribe`, the result will be an observable value.
   * If the value is a Promise it will be resolved first
   *
   * @param options EditorJS API call options
   * @param args Additional arguments to pass to the API request
   */
  public apiCall<T>(options: InjectorApiCallOptions, ...args: any[]): void {
    this.editorInstance.apiCall(options, ...args);
  }

  /**
   * Gets the EditorJS instance for the passed holder and calls the `save` method
   * to get the `OutputData` of the editor. This data is stored in the change subject
   * for that instance and the `hasSaved` value updated
   * @param options Options to configure a method call against the EditorJS core API
   * @param triggerUpdate If set to false the `hasChanged` Observable won't be updated
   */
  public save(options: InjectorMethodOption, triggerUpdate = true): void {
    this.editorInstance.save(options);
  }

  /**
   * Gets the EditorJS instance for the passed holder and calls the `clear` method.
   * @param options Options to configure a method call against the EditorJS core API
   * @param triggerUpdate If set to false the `hasChanged` Observable won't be updated
   */
  public clear(options: InjectorMethodOption, triggerUpdate = true): void {
    this.editorInstance.clear(options);
  }

  /**
   * Gets the EditorJS instance for the passed holder and calls the render method if blocks
   * are passed. Optionally can disable the `hasChanged` update - useful if doing actions
   * such as resetting data.
   * @param options Options to configure a method call against the EditorJS core API
   * @param triggerUpdate If set to false the `hasChanged` Observable won't be updated
   */
  public async update(options: InjectorMethodOption, triggerUpdate = true): Promise<void> {
    if (!options.data) {
      return;
    }
    const data = {
      time: Date.now(),
      version: this.editorJs.version,
      blocks: [],
      ...options.data
    };
    this.editorInstance.update(options, data);
  }

  /**
   * A map of ready states
   */
  private readyMap: ReadyMap = {};

  /**
   * A map of changes when the Editor was saved
   */
  private changeMap: ChangeMap = {};

  /**
   * Set the isReady state
   * @param readyState
   */
  public setIsReady(holder: string, readyState: boolean): void {
    if (!this.readyMap[holder]) {
      this.readyMap[holder] = new BehaviorSubject<boolean>(false);
    }
    this.readyMap[holder].next(readyState);
  }

  /**
   * Set the hasChanged state
   * @param readyState
   */
  public setHasChanged(holder: string, data: OutputData): void {
    if (!this.changeMap[holder]) {
      this.changeMap[holder] = new BehaviorSubject<OutputData>(data);
    }
    this.changeMap[holder].next(data);
  }

  /**
   * Subscribe to the `isReady` state change for the editor passed in the options
   * @param options Options to configure a method call against the EditorJS core API
   */
  public isReady(options: InjectorMethodOption): Observable<boolean> {
    if (!this.readyMap[options.holder]) {
      this.readyMap[options.holder] = new BehaviorSubject<boolean>(false);
    }
    return this.readyMap[options.holder].pipe(filter(ready => typeof ready !== 'undefined' && ready));
  }

  /**
   * Subscribe to the `lastChange` state change for the editor passed in the options
   * @param options Options to configure a method call against the EditorJS core API
   */
  public hasChanged(options: InjectorMethodOption): Observable<OutputData> {
    if (!this.changeMap[options.holder]) {
      this.changeMap[options.holder] = new BehaviorSubject<OutputData>({
        time: 0,
        blocks: [],
        version: this.editorJs.version
      });
    }
    return this.changeMap[options.holder].pipe(
      filter(data => typeof data !== 'undefined'),
      distinctUntilChanged((a, b) => a.time === b.time)
    );
  }

  /**
   * Destroys a single instance of EditorJS and all the subject values created for it
   * @param options Options to configure a method call against the EditorJS core API
   */
  public destroyInstance(options: InjectorMethodOption): void {
    this.editorInstance.destroy(options.holder);
    this.readyMap[options.holder].complete();
  }

  /**
   * Call this to destroy all subscriptions within the service
   */
  public destroy() {
    this.editorInstance.destroyAll();
  }

  /**
   * Returns a map of tools to be initialized by the editor
   * @param excludeTools Optional array of keys to exclude from the map
   * @param useDefaultKey Use the default key from the plugin instead of the user plugin name
   */
  private getTools(excludeTools: string[] = [], useDefaultKey = false): Observable<ToolSettingsMap> {
    return this.plugins.pipe(
      map(pluginsMap => {
        return Object.entries(pluginsMap)
          .filter(([key]) => !excludeTools.includes(key))
          .reduce((finalTools, [key, Plugin]) => {
            const pluginKey = useDefaultKey ? Plugin.key : key;
            const instance = new Plugin();
            return Plugin.shortcut
              ? {
                  [pluginKey]: {
                    class: instance.plugin(),
                    shortcut: Plugin.shortcut
                  },
                  ...finalTools
                }
              : { [pluginKey]: instance.plugin(), ...finalTools };
          }, {});
      })
    );
  }
}
