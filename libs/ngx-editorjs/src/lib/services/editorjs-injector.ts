import { ApplicationRef, Inject, Injectable, NgZone } from '@angular/core';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import {
  EditorJSInstance,
  EditorJSInstanceConfig,
  InjectorApiCallOptions,
  InjectorApiCallResponse,
  InjectorMethodOption,
  MAP_DEFAULTS
} from '../types/injector';
import { ChangeMap, EditorJSChange, EditorMap, ReadyMap, SavedMap } from '../types/maps';

/**
 * The NgxEditorJSInstanceService handles the creation and life cycle events of an `EditorJS` instance,
 * and provides methods to call the instance. The service also provides state observables for ready, change and
 * saved state
 */
@Injectable({
  providedIn: 'root'
})
export class NgxEditorJSInstanceService {
  /**
   * Internal destroy method for the service
   */
  private onDestroy$ = new Subject<boolean>();

  /**
   * Internal map of all EditorJS instances
   */
  private editorMap: EditorMap = {};

  /**
   * Internal map of all EditorJS ready states
   */
  private isReadyMap: ReadyMap = {};

  /**
   * Internal map of when `EditorJS` save is called
   */
  private hasSavedMap: SavedMap = {};

  /**
   * Internal map of all EditorJS change states
   */
  private hasChangedMap: ChangeMap = {};

  /**
   * Constructs the Injector service for `EditorJS`
   * @param editorJs The `EditorJS` class
   * @param zone Angular zone to run
   * @param ref The ApplicationRef to trigger a tick
   */
  constructor(
    @Inject(EditorJSInstance) private editorJs: any,
    private readonly zone: NgZone,
    private readonly ref: ApplicationRef
  ) {}

  /**
   * Creates a new `EditorJS` instance outside of the Angular zone and
   * then adds it to the editor instances
   * @param config The {EditorConfig} configuration to create
   */
  public async createInstance(config: EditorJSInstanceConfig): Promise<void> {
    const editorConfig = {
      ...config.editorConfig
    };
    editorConfig.onChange = (config.onChange && typeof config.onChange === 'function'
      ? config.onChange
      : this.onChange.bind(this, { holder: editorConfig.holder as string })) as any;
    editorConfig.onReady = (config.onReady && typeof config.onReady === 'function'
      ? config.onReady
      : this.onReady.bind(this, { holder: editorConfig.holder as string })) as any;

    return this.zone.runOutsideAngular(() => {
      const editor = new (this.editorJs as any)(editorConfig);
      const holder = editorConfig.holder as string;
      return editor.isReady.then(() => {
        return this.zone.run(async () => {
          await this.setupSubjects({ holder, editor });
          this.isReadyMap[holder].next(true);
          this.ref.tick();
        });
      });
    });
  }

  /**
   * Default onChange method for the `EditorJS` instance
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
   * The default onReady method for the `EditorJS` instance
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
   * A helper method to make calls to any `EditorJS` API (see [API Docs](https://editorjs.io/api))
   * The first argument should container the holder and method name, and namespace if required
   * The second argument is any additional arguments as required by the API.
   * The response of this method if a `Observable<InjectorApiCallResponse<T>>` which contains
   * the options passed and an extra `result` property. If the result is a Promise<T> it will
   * resolve the value
   * @param options Options to pass to the API request
   * @param args Additional arguments to pass to the API request
   */
  public apiCall<T>(options: InjectorApiCallOptions, ...args): Observable<InjectorApiCallResponse<T>> {
    return this.getEditor(options).pipe(
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
            throw new Error(`No method ${options.method} ${options.namespace ? 'in' + options.namespace : ''}`);
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
   * Calls the save method on the `EditorJS` instance and updates the blocks map
   * @param holder The holder ID of the `EditorJS` instance
   */
  public save(options: InjectorMethodOption) {
    this.getEditor(options)
      .pipe(take(1))
      .subscribe(editor => {
        this.zone.runOutsideAngular(() => {
          editor.saver.save().then(data => {
            this.zone.run(() => {
              this.hasSavedMap[options.holder].next(true);
              this.hasChangedMap[options.holder].next(data);
            });
          });
        });
      });
  }

  /**
   * Calls a clear method on an editor
   * @param holder The holder ID of the `EditorJS` instance
   */
  public clear(options: InjectorMethodOption) {
    this.getEditor(options)
      .pipe(take(1))
      .subscribe(editor => {
        this.zone.runOutsideAngular(() => {
          editor.blocks.clear();
          this.zone.run(() => {
            this.hasSavedMap[options.holder].next(true);
            this.hasChangedMap[options.holder].next({ time: Date.now(), blocks: [] });
          });
        });
      });
  }

  /**
   * Updates the editor with new blocks
   * @param options The options to update
   * @param triggerUpdate If set to false the hasChanged observable won't be updated
   */
  public update(options: InjectorMethodOption, triggerUpdate = true) {
    if (!options.blocks) {
      return;
    }
    this.getEditor(options)
      .pipe(take(1))
      .subscribe(editor => {
        this.zone.runOutsideAngular(() => {
          const time = Date.now();
          const data = {
            time,
            version: this.editorJs.version,
            blocks: options.blocks
          };
          editor.blocks.render(data);

          this.zone.run(() => {
            this.hasSavedMap[options.holder].next(false);
            if (triggerUpdate) {
              this.hasChangedMap[options.holder].next(data);
            }
          });
        });
      });
  }

  /**
   * Returns an Observable value of an `EditorJS` instance
   * @param holder The holder ID of the `EditorJS` instance
   */
  public getEditor(options: InjectorMethodOption): Observable<EditorJS> {
    if (!this.editorMap[options.holder]) {
      this.editorMap[options.holder] = new BehaviorSubject<EditorJS | undefined>(undefined);
    }
    return this.editorMap[options.holder].pipe(filter(editor => typeof editor !== 'undefined'));
  }

  /**
   * Returns an Observable value of an `EditorJS` instance
   * @param holder The holder ID of the `EditorJS` instance
   */
  public isReady(options: InjectorMethodOption): Observable<boolean> {
    if (!this.isReadyMap[options.holder]) {
      this.isReadyMap[options.holder] = new BehaviorSubject<boolean>(false);
    }
    return this.isReadyMap[options.holder].asObservable();
  }

  /**
   * Returns an Observable value of when an `EditorJS` changes
   * @param holder The holder ID of the `EditorJS` instance
   */
  public hasChanged(options: InjectorMethodOption): Observable<OutputData> {
    if (!this.hasChangedMap[options.holder]) {
      this.hasChangedMap[options.holder] = new BehaviorSubject<OutputData>({ time: 0, blocks: [] });
    }
    return this.hasChangedMap[options.holder].asObservable();
  }

  /**
   * Returns an Observable value of an `EditorJS` saves
   * @param holder The holder ID of the `EditorJS` instance
   */
  public hasSaved(options: InjectorMethodOption): Observable<boolean> {
    if (!this.hasSavedMap[options.holder]) {
      this.hasSavedMap[options.holder] = new BehaviorSubject<boolean>(false);
    }
    return this.hasSavedMap[options.holder].asObservable();
  }

  /**
   * Destroys an instance of an editor and cleans up all Observable values
   * @param holder The holder ID of the `EditorJS` instance
   */
  public destroyInstance(options: InjectorMethodOption): void {
    const instanceDestroyed = new Subject<boolean>();
    this.getEditor(options)
      .pipe(takeUntil(instanceDestroyed))
      .subscribe(editor => {
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
   * Sets up the Subjects provided by this service
   * @param holder The holder to set up the subjects for
   * @param editor The Editor instance created outside of Angular
   */
  private async setupSubjects({ holder, editor }: InjectorMethodOption): Promise<void> {
    MAP_DEFAULTS.forEach(([mapKey, value]: [string, typeof value]) => {
      if (!this[mapKey][holder]) {
        this[mapKey][holder] = new BehaviorSubject<typeof value>(value);
      }
      this[mapKey][holder].next(value);
    });
    if (this.editorMap[holder]) {
      this.editorMap[holder].next(editor);
    } else {
      this.editorMap[holder] = new BehaviorSubject<EditorJS>(editor);
    }
  }

  /**
   * Handles cleaning up all the subjects once an `EditorJS` instance has been
   * destroyed
   * @param holder The holder ID for the `EditorJS` instance
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
