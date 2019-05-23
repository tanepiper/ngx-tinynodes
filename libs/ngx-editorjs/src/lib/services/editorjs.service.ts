import { ApplicationRef, Inject, Injectable, NgZone } from '@angular/core';
import EditorJS, { OutputData, EditorConfig } from '@editorjs/editorjs';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import {
  EditorJSInstance,
  EditorJSInstanceConfig,
  InjectorApiCallOptions,
  InjectorApiCallResponse,
  InjectorMethodOption,
  MAP_DEFAULTS,
  EditorJSClass
} from '../types/injector';
import { ChangeMap, EditorJSChange, EditorMap, ReadyMap, SavedMap } from '../types/maps';
import { NGX_EDITORJS_CONFIG, NgxEditorJSModuleConfig } from '../types/config';
import { NgxEditorJSPluginService } from './plugins.service';
import { CreateEditorJSOptions } from '../types/editorjs-service';

/**
 * The NgxEditorJSInstanceService handles the management of EditorJS instances.
 * All EditorJS instances are created outside of Angular using `NgZone` to ensure change detection
 * is not triggered.
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
   * Internal destroy method for the service
   * @internal
   */
  private readonly onDestroy$ = new Subject<boolean>();

  /**
   * Internal map of all EditorJS instances
   */
  private readonly editorMap: EditorMap = {};

  /**
   * Internal map of all EditorJS ready states
   */
  private readonly isReadyMap: ReadyMap = {};

  /**
   * Internal map of when EditorJS save is called
   */
  private readonly hasSavedMap: SavedMap = {};

  /**
   * Internal map of all EditorJS change states
   */
  private readonly hasChangedMap: ChangeMap = {};

  /**
   * @param editorJs The EditorJS class injected into the application and used to create new editor instances
   * @param zone The Angular Zone service that allows the EditorJS methods to be run outside of Angular
   * @param ref The ApplicationRef provided by Angular, used to trigger an application tick
   */
  constructor(
    @Inject(EditorJSInstance) private editorJs: EditorJSClass,
    private readonly zone: NgZone,
    private readonly ref: ApplicationRef,
    @Inject(NGX_EDITORJS_CONFIG) private config: NgxEditorJSModuleConfig,
    private readonly plugins: NgxEditorJSPluginService
  ) {}

  /**
   * Creates a new EditorJS instance outside of the Angular zone and
   * then adds it to the editor instances
   * @param config The `EditorJSInstanceConfig` configuration
   */
  public async createInstance(options: CreateEditorJSOptions): Promise<void> {
    const editorConfig: EditorConfig = {
      ...this.config.editorjs,
      ...options.config,
      tools: this.plugins.getTools(options.includeTools)
    };
    editorConfig.onChange = (editorConfig.onChange && typeof editorConfig.onChange === 'function'
      ? editorConfig.onChange
      : this.onChange.bind(this, { holder: editorConfig.holder as string })) as any;
    editorConfig.onReady = (editorConfig.onReady && typeof editorConfig.onReady === 'function'
      ? editorConfig.onReady
      : this.onReady.bind(this, { holder: editorConfig.holder as string })) as any;

    return this.zone.runOutsideAngular(async () => {
      const editor = new this.editorJs(editorConfig);
      const holder = editorConfig.holder as string;
      await editor.isReady;
      return this.zone.run(async () => {
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
   * Default onChange method for the EditorJS instance
   * @param options The InjectorMethodOption for this request
   */
  protected onChange(options: InjectorMethodOption): () => void {
    return () => {
      if (!this.hasChangedMap[options.holder]) {
        this.hasChangedMap[options.holder] = new BehaviorSubject<EditorJSChange>({ time: 0, blocks: [] });
      }
      this.hasChangedMap[options.holder].next({
        time: Date.now(),
        blocks: options.blocks || []
      });
    };
  }

  /**
   * The default onReady method for the EditorJS instance
   * @param Options The InjectorMethodOption for this request
   */
  protected onReady(options: InjectorMethodOption): () => void {
    return () => {
      if (!this.isReadyMap[options.holder]) {
        this.isReadyMap[options.holder] = new BehaviorSubject<boolean>(false);
      }
      this.isReadyMap[options.holder].next(true);
    };
  }

  /**
   * A helper method to make calls to any EditorJS API (see [API Docs](https://editorjs.io/api))
   * The first argument should container the holder and method name, and namespace if required
   * The second argument is any additional arguments as required by the API.
   *
   * Unlike other methods an API call be made with a `.subscribe`, the result will be an observable value.
   * If the value is a Promise it will be resolved first
   *
   * @param options EditorJS API call options
   * @param args Additional arguments to pass to the API request
   */
  public apiCall<T>(options: InjectorApiCallOptions, ...args: any[]): Observable<InjectorApiCallResponse<T>> {
    return this.editorMap[options.holder].pipe(
      take(1),
      map(editor => {
        return this.zone.runOutsideAngular(() => {
          let method: any;
          if (!options.namespace) {
            method = editor[options.method];
          } else {
            method = editor[options.namespace][options.method];
          }
          if (!method) {
            throw new Error(`No method ${options.method} ${options.namespace ? 'in ' + options.namespace : ''}`);
          }
          const result = method.call(editor, ...args);
          return this.zone.run(() => {
            if (!result || (result && !result.then)) {
              return {
                ...options,
                result
              };
            }
            return result.then(result => ({ ...options, result }));
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
   */
  public save(options: InjectorMethodOption): void {
    this.editorMap[options.holder].pipe(take(1)).subscribe(async editor => {
      await this.zone.runOutsideAngular(async () => {
        const data = await editor.saver.save();
        await this.zone.run(() => {
          this.hasSavedMap[options.holder].next(true);
          this.hasChangedMap[options.holder].next(data);
        });
      });
    });
  }

  /**
   * Gets the EditorJS instance for the passed holder and calls the `clear` method.
   * @param options Options to configure a method call against the EditorJS core API
   */
  public clear(options: InjectorMethodOption): void {
    this.editorMap[options.holder].pipe(take(1)).subscribe(async editor => {
      await this.zone.runOutsideAngular(async () => {
        editor.blocks.clear();
        await this.zone.run(() => {
          this.hasSavedMap[options.holder].next(true);
          this.hasChangedMap[options.holder].next({ time: Date.now(), blocks: [] });
        });
      });
    });
  }

  /**
   * Gets the EditorJS instance for the passed holder and calls the render method if blocks
   * are passed. Optionally can disable the `hasChanged` update - useful if doing actions
   * such as resetting data.
   * @param options Options to configure a method call against the EditorJS core API
   * @param triggerUpdate If set to false the `hasChanged` Observable won't be updated
   */
  public update(options: InjectorMethodOption, triggerUpdate = true): void {
    if (!options.blocks) {
      return;
    }
    this.editorMap[options.holder].pipe(take(1)).subscribe(async editor => {
      await this.zone.runOutsideAngular(() => {
        const time = Date.now();
        const data = {
          time,
          version: this.editorJs.version,
          blocks: options.blocks
        };
        editor.blocks.render(data);

        return this.zone.run(() => {
          this.hasSavedMap[options.holder].next(false);
          if (triggerUpdate) {
            this.hasChangedMap[options.holder].next(data);
          }
        });
      });
    });
  }

  /**
   * Returns the underlying EditorJS instance
   * @param options Options to configure a method call against the EditorJS core API
   */
  public getEditor(options: InjectorMethodOption): Observable<EditorJS> {
    ('getEditor called');
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
   * Subscribe to the `hasChanged` state change for the editor passed in the options
   * @param options Options to configure a method call against the EditorJS core API
   */
  public hasChanged(options: InjectorMethodOption): Observable<OutputData> {
    if (!this.hasChangedMap[options.holder]) {
      this.hasChangedMap[options.holder] = new BehaviorSubject<OutputData>({ time: 0, blocks: [] });
    }
    return this.hasChangedMap[options.holder].asObservable();
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
   * Destroys a single instance of EditorJS and all the subject values created for it
   * @param options Options to configure a method call against the EditorJS core API
   */
  public destroyInstance(options: InjectorMethodOption): void {
    const instanceDestroyed = new Subject<boolean>();
    this.editorMap[options.holder].pipe(takeUntil(instanceDestroyed)).subscribe(editor => {
      this.zone.runOutsideAngular(() => {
        editor.destroy();
        this.zone.run(() => {
          this.cleanupSubjects({ holder: options.holder });
          instanceDestroyed.next(true);
          instanceDestroyed.complete();
          this.ref.tick();
        });
      });
    });
  }

  /**
   * Sets up the `BehaviorSubject` values when an EditorJS instance is created.  All the subjects are first created and set
   * to default values.
   * Once an EditorJS instance is ready these values can provide change and save state information
   * @param options Options to configure a method call against the EditorJS core API
   */
  private async setupSubjects(options: InjectorMethodOption): Promise<void> {
    MAP_DEFAULTS.forEach(([mapKey, value]: [string, typeof value]) => {
      if (!this[mapKey][options.holder]) {
        this[mapKey][options.holder] = new BehaviorSubject<typeof value>(value);
      }
      this[mapKey][options.holder].next(value);
    });
  }

  /**
   * Handles cleaning up all the `BehaviorSubject` values once an EditorJS instance has been destroyed
   * @param holder The holder ID for the EditorJS instance
   */
  private cleanupSubjects(options: InjectorMethodOption) {
    MAP_DEFAULTS.forEach(([mapKey, value]: [string, any]) => {
      if (this[mapKey][options.holder]) {
        this[mapKey][options.holder].next(value);
        this[mapKey][options.holder].complete();
        this[mapKey][options.holder] = null;
        delete this[mapKey][options.holder];
      }
    });
    this.editorMap[options.holder] = null;
    delete this.editorMap[options.holder];
  }

  /**
   * Call this to destroy all subscriptions within the service
   */
  public destroy() {
    Object.keys(this.editorMap).forEach(holder => {
      this.destroyInstance({ holder });
    });
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
