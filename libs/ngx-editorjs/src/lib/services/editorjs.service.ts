import { ApplicationRef, Inject, Injectable, NgZone } from '@angular/core';
import EditorJS, { EditorConfig, OutputData } from '@editorjs/editorjs';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, filter, switchMap, take, tap } from 'rxjs/operators';
import { NGX_EDITORJS_CONFIG, NgxEditorJSModuleConfig } from '../types/config';
import { CreateEditorJSOptions } from '../types/editorjs-service';
import {
  EditorJSClass,
  EditorJSInstance,
  InjectorApiCallOptions,
  InjectorApiCallResponse,
  InjectorMethodOption,
  MAP_DEFAULTS
} from '../types/injector';
import { ChangeMap, EditorMap, ReadyMap, SavedMap } from '../types/maps';
import { NgxEditorJSPluginService, ToolSettingsMap, PluginConfig } from '@tinynodes/ngx-editorjs-plugins';

/**
 * This handles the management of {@link https://editorjs.io/api | EditorJS} instances and their lifecycle.
 *
 * All `EditorJS` instances are created outside of Angular using {@link https://angular.io/api/core/NgZone | NgZone } to ensure change detection is not triggered.
 * Once an instance is created, several {@link https://angular.io/guide/observables | Observable} values are also set up:
 *
 *  - {@link #isReady | isReady } Set when the editor instance is ready in the DOM
 *  - {@link #hasSaved | hasSaved } Set when the editor `.save()` method has been called.
 *  - {@link #lastChange | lastChange } Set when a change happens, contains the `OutputData` from the Editor.
 *
 * After setup, {@link #isReady | isReady } is set to true and the editor can be used within Angular.  There are some methods provided
 * for {@link #save | save }, {@link #update | update } and {@link #clear | clear } - and an {@link #apiCall | apiCall } method which allows
 * for any call to be made to EditorJS that matches it's API.
 */
@Injectable({
  providedIn: 'root'
})
export class NgxEditorJSService {
  /**
   * Internal destroy subject for the service
   */
  private readonly onDestroy$ = new Subject<boolean>();

  /**
   * Internal map of all {@link https://editorjs.io/api | EditorJS} instances
   */
  private readonly editorMap: EditorMap = {};

  /**
   * Internal map of all {@link https://editorjs.io/api | EditorJS} ready states
   */
  private readonly isReadyMap: ReadyMap = {};

  /**
   * Internal map of when {@link https://editorjs.io/api | EditorJS} save is called
   */
  private readonly hasSavedMap: SavedMap = {};

  /**
   * Internal map of all {@link https://editorjs.io/api | EditorJS} change states
   */
  private readonly lastChangeMap: ChangeMap = {};

  private toolbarOpen = false;

  /**
   * @param editorJs The EditorJS class injected into the application and used to create new editor instances
   * @param config The configuration provided from the NgxEditorJSModule.forRoot method
   * @param plugins The plugin service which provides all plugins injected into the application
   * @param zone The Angular Zone service that allows the EditorJS methods to be run outside of Angular
   * @param ref The ApplicationRef provided by Angular, used to trigger an application tick
   */
  constructor(
    @Inject(EditorJSInstance) private readonly editorJs: EditorJSClass,
    @Inject(NGX_EDITORJS_CONFIG) private readonly config: NgxEditorJSModuleConfig,
    private readonly plugins: NgxEditorJSPluginService,
    private readonly zone: NgZone,
    private readonly ref: ApplicationRef
  ) {
  }

  /**
   * Creates a new {@link https://editorjs.io/api | EditorJS} instance outside of the Angular zone and then adds it to the editor instances
   *
   * @remark
   * This method uses `async/await`
   *
   * @param options A configuration passed to create an EditorJS instance
   * @returns A Promise when the editor has been created
   */
  public async createInstance(options: CreateEditorJSOptions): Promise<void> {
    const editorConfig: EditorConfig = {
      ...this.config.editorjs,
      ...options.config,
      tools: this.getTools(options.excludeTools)
    };

    // Bind the editor onChange method from the config, otherwise use the local createOnChange method
    editorConfig.onChange =
      editorConfig.onChange && typeof editorConfig.onChange === 'function'
        ? editorConfig.onChange
        : this.createOnChange.call(this, { holder: editorConfig.holder as string });

    // Bind the editor onReady method from the config, otherwise use the local createOnReady method
    editorConfig.onReady =
      editorConfig.onReady && typeof editorConfig.onReady === 'function'
        ? editorConfig.onReady
        : this.createOnReady.call(this, { holder: editorConfig.holder as string });

    await this.zone.runOutsideAngular(async () => {
      const editor = new this.editorJs(editorConfig);
      const holder = editorConfig.holder as string;
      await editor.isReady;
      await this.zone.run(async () => {
        await this.setupSubjects({ holder });
        if (this.editorMap[holder]) {
          this.editorMap[holder].next(editor);
        } else {
          this.editorMap[holder] = new BehaviorSubject<EditorJS>(editor);
        }
        this.isReadyMap[holder].next(true);
        this.ref.tick();
      });
    });
  }

  /**
   * A helper method to make calls to the {@link https://editorjs.io/api | EditorJS API } of any instance.
   * The first argument is an object that you must pass the `method` name, and the `holder` ID of the container.
   * An optional `namespace` can be added for API calls such as `blocks`, `caret`, etc.
   *
   * The second argument is any additional arguments as required by the API.
   *
   * @remarks
   * Unlike other methods an API call be made with a `.subscribe`, the result will be an observable value.
   * If the value is a Promise it will be resolved first
   *
   * @param options The options for the API call to be made
   * @param args Any arguments to be passed to the API call
   * @returns An Observable of the API response
   */
  public apiCall<T = any>(options: InjectorApiCallOptions, ...args: any[]): Observable<InjectorApiCallResponse<T>> {
    return this.getEditor(options).pipe(
      take(1),
      switchMap(async editor => {
        let result: InjectorApiCallResponse<T> = { ...options, result: undefined };

        await this.zone.runOutsideAngular(async () => {
          let method: any;
          if (!options.namespace) {
            method = editor[options.method];
          } else {
            method = editor[options.namespace][options.method];
          }
          if (!method) {
            throw new Error(`No method ${ options.method } ${ options.namespace ? 'in ' + options.namespace : '' }`);
          }
          const methodCall = method.call(editor, ...args);
          await this.zone.run(async () => {
            if (!methodCall || (methodCall && !methodCall.then)) {
              result = {
                ...result,
                result: typeof methodCall === 'undefined' ? {} : methodCall
              };
            } else {
              const r = await methodCall;
              result = { ...result, result: r };
            }
          });
        });

        return result;
      })
    );
  }

  /**
   * Call the `save` method of an {@link https://editorjs.io/api | EditorJS} instance and sets the current value of the service to the result
   * @param options Options for the method call
   */
  public save(options: InjectorMethodOption): Observable<InjectorApiCallResponse<OutputData>> {
    return this.apiCall({ holder: options.holder, namespace: 'saver', method: 'save' }).pipe(
      take(1),
      tap((response: InjectorApiCallResponse<OutputData>) => {
        this.hasSavedMap[options.holder].next(true);
        this.lastChangeMap[options.holder].next(response.result);
      })
    );
  }

  /**
   * Gets the {@link https://editorjs.io/api | EditorJS} instance for the passed holder and calls the `clear` method.
   * @param options Options to configure a method call against the EditorJS core API
   */
  public clear(options: InjectorMethodOption): Observable<InjectorApiCallResponse<OutputData>> {
    return this.apiCall({ holder: options.holder, namespace: 'blocks', method: 'clear' }).pipe(
      take(1),
      switchMap((response) => options.skipSave ? of(response) : this.save(options))
    );
  }

  /**
   * Gets the {@link https://editorjs.io/api | EditorJS} instance for the passed holder and calls the render method if blocks
   * are passed. Optionally can disable the `lastChange` update - useful if doing actions
   * such as resetting data.
   * @param options Options to configure a method call against the EditorJS core API
   */
  public update(options: InjectorMethodOption): Observable<InjectorApiCallResponse<OutputData>> {
    const data = {
      time: options.data && options.data.time || Date.now(),
      version: options.data && options.data.version || this.editorJs.version,
      blocks: [...options.data.blocks],
    };
    return this.apiCall({ holder: options.holder, namespace: 'blocks', method: 'render' }, data).pipe(
      take(1),
      switchMap((response) => options.skipSave ? of(response) : this.save(options))
    );
  }

  /**
   * Returns the underlying {@link https://editorjs.io/api | EditorJS} instance
   * @param options Options to configure a method call against the EditorJS core API
   */
  public getEditor(options: InjectorMethodOption): Observable<EditorJS> {
    if (!this.editorMap[options.holder]) {
      this.editorMap[options.holder] = new BehaviorSubject<EditorJS | undefined>(undefined);
    }
    return this.editorMap[options.holder].pipe(filter(editor => typeof editor !== 'undefined'));
  }

  /**
   * Subscribe to the `isReady` state change for the editor passed in the options
   * @param options Options to configure a method call against the EditorJS core API
   */
  public isReady(options: InjectorMethodOption): Observable<boolean> {
    if (!this.isReadyMap[options.holder]) {
      this.isReadyMap[options.holder] = new BehaviorSubject<boolean>(false);
    }
    return this.isReadyMap[options.holder].asObservable();
  }

  /**
   * Subscribe to the `lastChange` state change for the editor passed in the options
   * @param options Options to configure a method call against the EditorJS core API
   */
  public lastChange(options: InjectorMethodOption): Observable<OutputData> {
    if (!this.lastChangeMap[options.holder]) {
      this.lastChangeMap[options.holder] = new BehaviorSubject<OutputData>({
        time: 0,
        blocks: [],
        version: this.editorJs.version
      });
    }
    return this.lastChangeMap[options.holder].pipe(
      distinctUntilChanged((a, b) => (b && b.time && b.time === 0) || (a && b && (a.time && a.time === b.time))),
      filter(hasChanged => typeof hasChanged !== 'undefined')
    );
  }

  /**
   * Subscribe to the `hasSaved` state change for the editor passed in the options
   * @param options Options to configure a method call against the EditorJS core API
   */
  public hasSaved(options: InjectorMethodOption): Observable<boolean> {
    if (!this.hasSavedMap[options.holder]) {
      this.hasSavedMap[options.holder] = new BehaviorSubject<boolean>(false);
    }
    return this.hasSavedMap[options.holder].asObservable();
  }

  /**
   * Destroys a single instance of {@link https://editorjs.io/api | EditorJS} and all the subject values created for it
   * @param options Options to configure a method call against the EditorJS core API
   */
  public destroyInstance(options: InjectorMethodOption): void {
    this.getEditor(options)
      .pipe(take(1))
      .subscribe(editor => {
        this.zone.runOutsideAngular(() => {
          editor.destroy();
          this.zone.run(() => {
            this.cleanupSubjects({ holder: options.holder });
            this.ref.tick();
          });
        });
      });
  }

  /**
   * Call this to destroy all subscriptions within the service
   */
  public destroy() {
    Object.keys(this.editorMap).forEach(holder => this.destroyInstance({ holder }));
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  /**
   * Internal method to create an default onChange method for {@link https://editorjs.io/api | EditorJS}
   * @param options The InjectorMethodOption for this request
   */
  private createOnChange(options: InjectorMethodOption): (change: OutputData) => void {
    if (!this.lastChangeMap[options.holder]) {
      this.lastChangeMap[options.holder] = new BehaviorSubject<OutputData>({ blocks: [] });
    }
    return (change: OutputData) => {
      if (change) {
        this.lastChangeMap[options.holder].next(change);
      }
    };
  }

  /**
   * Internal method to create an default onReady method for {@link https://editorjs.io/api | EditorJS}
   * @param options The InjectorMethodOption for this request
   */
  private createOnReady(options: InjectorMethodOption): () => void {
    if (!this.isReadyMap[options.holder]) {
      this.isReadyMap[options.holder] = new BehaviorSubject<boolean>(false);
    }

    return () => {
      if (!this.isReadyMap[options.holder].value) {
        this.isReadyMap[options.holder].next(true);
      }
    };
  }

  /**
   * Sets up the `BehaviorSubject` values when an {@link https://editorjs.io/api | EditorJS} instance is created.  All the subjects are first created and set
   * to default values.
   * Once an EditorJS instance is ready these values can provide change and save state information
   * @param options Options to configure a method call against the EditorJS core API
   */
  private async setupSubjects(options: InjectorMethodOption): Promise<void> {
    MAP_DEFAULTS.forEach(([ mapKey, value ]: [ string, typeof value ]) => {
      if (!this[mapKey][options.holder]) {
        this[mapKey][options.holder] = new BehaviorSubject<typeof value>(value);
      }
      this[mapKey][options.holder].next(value);
    });
  }

  /**
   * Handles cleaning up all the `BehaviorSubject` values once an {@link https://editorjs.io/api | EditorJS} instance has been destroyed
   * @param options The options to pass to clean up the subjects
   */
  private cleanupSubjects(options: InjectorMethodOption) {
    MAP_DEFAULTS.forEach(([ mapKey ]: [ string ]) => {
      if (this[mapKey][options.holder]) {
        this[mapKey][options.holder].complete();
        this[mapKey][options.holder] = null;
        delete this[mapKey][options.holder];
      }
    });
    this.editorMap[options.holder].complete();
    this.editorMap[options.holder] = null;
    delete this.editorMap[options.holder];
  }

  /**
   * Returns a map of {@link https://editorjs.io/api | EditorJS} tools to be initialized by the editor
   * @param excludeTools Optional array of tools to exclude, if not passed all tools
   */
  private getTools(excludeTools: string[] = []): ToolSettingsMap {
    return Object.entries(this.plugins.getPluginsWithExclude(excludeTools))
      .reduce(
        (finalTools, [ key, plugin ]: [string, PluginConfig]) => {
          const tool: any = {
            class: plugin.plugin
          };
          if (plugin.shortcut) tool.shortcut = plugin.shortcut;
          if (plugin.type === 'inline') tool.inlineToolbar = true;
          if (plugin.config) tool.config = plugin.config;

          return { ...finalTools, [key]: tool };
        },
        {}
      );
  }
}
