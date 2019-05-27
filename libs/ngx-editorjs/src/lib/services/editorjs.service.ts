import { ApplicationRef, Inject, Injectable, NgZone } from '@angular/core';
import { EditorConfig, OutputData } from '@editorjs/editorjs';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { EditorJSInstance } from '../models/editorjs-instance';
import { NgxEditorJSModuleConfig, NGX_EDITORJS_CONFIG } from '../types/config';
import { CreateEditorJSOptions } from '../types/editorjs-service';
import {
  EditorJSClass,
  EDITORJS_INSTANCE,
  InjectorApiCallOptions,
  InjectorApiCallResponse,
  InjectorMethodOption
} from '../types/injector';
import { PluginDefaultsMaps, PluginMap, ToolSettingsMap, UserPlugins } from '../types/plugins';

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
   * Internal map of plugins available
   */
  private pluginsMap: PluginMap = {};

  /**
   * Internal cache of all the available plugins
   */
  private plugins$ = new BehaviorSubject<PluginDefaultsMaps>({});

  /**
   * Get the plugin defaults, which includes the constructor
   */
  public get plugins() {
    return this.plugins$.asObservable();
  }

  /**
   * State of if the editor save has been called since the last change
   */
  private readonly savedMap: { [key: string]: BehaviorSubject<boolean> } = {};

  /**
   * The internal instance map of editors
   */
  private instances: { [key: string]: BehaviorSubject<EditorJSInstance | undefined> } = {};

  /**
   * Get an instance of an editor, pass an optional subject that will be
   * used to destroy the instance
   * @param holder The holder string of the instance
   * @param destroyOn Optional subject to use to destroy the instance
   */
  private getInstance(holder: string, destroyOn?: Subject<boolean>): Observable<EditorJSInstance> {
    if (!this.instances[holder]) {
      this.instances[holder] = new BehaviorSubject<EditorJSInstance | undefined>(undefined);
    }
    return this.instances[holder].pipe(
      filter(instance => typeof instance !== 'undefined'),
      destroyOn ? takeUntil(destroyOn) : take(1)
    );
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
    private readonly zone: NgZone,
    private readonly ref: ApplicationRef
  ) {
    // Assign the plugin classes to the key from the user plugin map
    const plugins: PluginDefaultsMaps = Object.entries({ ...this.userPlugins }).reduce((pluginMap, [key, Plugin]) => {
      // Update the Plugin Map
      this.pluginsMap[key] = Plugin;

      return {
        ...pluginMap,
        [key]: {
          type: Plugin.type,
          key: Plugin.key,
          pluginName: Plugin.pluginName,
          description: Plugin.description || '',
          shortcut: Plugin.shortcut || '',
          constructor: Plugin
        }
      };
    }, {});
    this.plugins$.next(plugins);
  }

  /**
   * Creates a new EditorJS instance outside of the Angular zone and then adds it to the editor instances
   * This method should be called with `await` to ensure the editor is fully initialized
   * @param options The options to pass to the method for creating an EditorJS instance
   */
  public async createInstance(options: CreateEditorJSOptions): Promise<void> {
    const newInstance = new EditorJSInstance();

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

        await this.zone.runOutsideAngular(async () => {
          const editor = new this.editorJs(editorConfig);
          const holder = editorConfig.holder as string;
          await editor.isReady;
          await this.zone.run(async () => {
            newInstance.setEditor(editor);
            newInstance.setIsReady(true);
            this.savedMap[holder] = new BehaviorSubject<boolean>(false);
            this.instances[holder].next(newInstance);
            this.ref.tick();
          });
        });
      });
  }

  /**
   * Internal method to create an default onChange method for `EditorJS`
   * @param options The InjectorMethodOption for this request
   */
  private createOnChange(options: InjectorMethodOption): (change: OutputData) => void {
    const onChange = (change: OutputData) => {
      if (!change) {
        return;
      }
      this.getInstance(options.holder)
        .pipe(take(1))
        .subscribe(instance => {
          instance.setLastChange(change);
          this.setHasSaved(options, false);
        });
    };
    return onChange;
  }

  /**
   * Internal method to create an default onReady method for `EditorJS`
   * @param options The InjectorMethodOption for this request
   */
  private createOnReady(options: InjectorMethodOption): () => void {
    const onReady = () => {
      this.getInstance(options.holder)
        .pipe(take(1))
        .subscribe(instance => {
          instance.setIsReady(true);
        });
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
  public apiCall<T>(options: InjectorApiCallOptions, ...args: any[]): Observable<InjectorApiCallResponse<T>> {
    const { holder } = options;
    return this.getInstance(holder).pipe(
      take(1),
      switchMap(instance => {
        return this.zone.runOutsideAngular(async () => {
          const result = await instance.apiCall(options, ...args);
          return this.zone.run(() => {
            return {
              ...options,
              instance,
              result: typeof result === 'undefined' ? {} : result
            } as InjectorApiCallResponse<T>;
          });
        });
      })
    );
  }

  /**
   * Gets the EditorJS instance for the passed holder and calls the `save` method
   * to get the `OutputData` of the editor. This data is stored in the change subject
   * for that instance and the `hasSaved` value updated
   * @param options Options to configure a method call against the EditorJS core API
   * @param triggerUpdate If set to false the `hasChanged` Observable won't be updated
   */
  public save(options: InjectorMethodOption, triggerUpdate = true): void {
    this.apiCall({ holder: options.holder, namespace: 'saver', method: 'save' }).subscribe(() => {
      this.setHasSaved(options, true);
    });
  }

  /**
   * Gets the EditorJS instance for the passed holder and calls the `clear` method.
   * @param options Options to configure a method call against the EditorJS core API
   * @param triggerUpdate If set to false the `hasChanged` Observable won't be updated
   */
  public clear(options: InjectorMethodOption, triggerUpdate = true): void {
    this.setHasSaved(options, false);

    this.apiCall({ holder: options.holder, namespace: 'blocks', method: 'clear' }).subscribe(
      (response: InjectorApiCallResponse<OutputData>) =>
        response.instance.setLastChange({
          time: Date.now(),
          version: this.editorJs.version,
          blocks: [
            {
              type: 'paragraph',
              data: {
                text: ''
              }
            }
          ]
        })
    );
  }

  /**
   * Gets the EditorJS instance for the passed holder and calls the render method if blocks
   * are passed. Optionally can disable the `hasChanged` update - useful if doing actions
   * such as resetting data.
   * @param options Options to configure a method call against the EditorJS core API
   * @param triggerUpdate If set to false the `hasChanged` Observable won't be updated
   */
  public update(options: InjectorMethodOption, triggerUpdate = true): void {
    if (!options.data) {
      return;
    }
    const data = {
      time: Date.now(),
      version: this.editorJs.version,
      blocks: [],
      ...options.data
    };
    this.setHasSaved(options, false);
    this.apiCall({ holder: options.holder, namespace: 'blocks', method: 'render' }, data).subscribe(response => {
      response.instance.setLastChange(data);
    });
  }

  /**
   * Subscribe to the `isReady` state change for the editor passed in the options
   * @param options Options to configure a method call against the EditorJS core API
   */
  public isReady(options: InjectorMethodOption): Observable<boolean> {
    return this.getInstance(options.holder).pipe(switchMap(instance => instance.isReady));
  }

  /**
   * Subscribe to the `lastChange` state change for the editor passed in the options
   * @param options Options to configure a method call against the EditorJS core API
   */
  public lastChange(options: InjectorMethodOption): Observable<OutputData> {
    return this.getInstance(options.holder).pipe(switchMap(instance => instance.lastChange));
  }

  /**
   * Get if the editor save has been called since the last change
   */
  public hasSaved(options: InjectorMethodOption): Observable<boolean> {
    if (!this.savedMap[options.holder]) {
      this.savedMap[options.holder] = new BehaviorSubject<boolean>(false);
    }
    return this.savedMap[options.holder].asObservable();
  }

  /**
   * Set the last save state
   */
  public setHasSaved(options: InjectorMethodOption, hasSaved: boolean) {
    if (!this.savedMap[options.holder]) {
      this.savedMap[options.holder] = new BehaviorSubject<boolean>(false);
    }
    this.savedMap[options.holder].next(hasSaved);
  }

  /**
   * Destroys a single instance of EditorJS and all the subject values created for it
   * @param options Options to configure a method call against the EditorJS core API
   */
  public destroyInstance(options: InjectorMethodOption): Observable<void> {
    return this.getInstance(options.holder).pipe(
      take(1),
      switchMap(instance =>
        this.zone.runOutsideAngular(() =>
          Promise.resolve(instance.destroy()).then(() =>
            this.zone.run(() => {
              this.instances[options.holder].complete();
              this.ref.tick();
            })
          )
        )
      )
    );
  }

  /**
   * Call this to destroy all subscriptions within the service
   */
  public destroy() {
    Object.keys(this.instances).forEach(holder => this.destroyInstance({ holder }));
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
          .reduce((finalTools, [key, plugin]) => {
            const pluginKey = useDefaultKey ? plugin.key : key;
            const instance = new plugin.constructor();
            return plugin.shortcut
              ? {
                  [pluginKey]: {
                    class: instance.plugin(),
                    shortcut: plugin.shortcut
                  },
                  ...finalTools
                }
              : { [pluginKey]: instance.plugin(), ...finalTools };
          }, {});
      })
    );
  }
}
