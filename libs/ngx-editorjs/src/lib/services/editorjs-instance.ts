import { ApplicationRef, Inject, Injectable, NgZone } from '@angular/core';
import EditorJS, { EditorConfig, OutputData } from '@editorjs/editorjs';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, filter, take, switchMap, map, tap } from 'rxjs/operators';
import { EditorJSClass, EDITORJS_INSTANCE, InjectorApiCallOptions, InjectorMethodOption } from '../types/injector';
import { ReadyMap, EditorMap, ChangeMap } from '../types/maps';

/**
 * The `EditorJSInstanceService` provides an Angular `NgZone` wrapper around `EditorJS`.
 * `EditorJS` has it's own DOM life-cycle, so all creation of instances and api commands
 * are run outside of the Angular zone, and any resolution of the result is handled
 */
@Injectable({
  providedIn: 'root'
})
export class EditorJSInstanceService {
  /**
   * @param editorJs The EditorJS class, used to create new instances
   * @param zone The Angular Zone
   * @param ref The Angular app reference
   */
  constructor(
    @Inject(EDITORJS_INSTANCE) private readonly editorJs: EditorJSClass,
    private readonly zone: NgZone,
    private readonly ref: ApplicationRef
  ) {}

  /**
   * A map of EditorJS instances
   */
  private editorMap: EditorMap = {};

  /**
   * A replay map of all API calls
   */
  public apiValueMap: {
    [key: string]: ReplaySubject<{
      holder: string;
      result: any;
    }>;
  } = {};

  /**
   * Creates an instance of `EditorJS` outside of the Angular context and returns values to it
   * @param config The EditorConfig for this instance
   */
  public createInstance(config: EditorConfig): Promise<void> {
    const holder = config.holder as string; // Cast due to EditorConfig

    this.apiValueMap[holder] = new ReplaySubject<any>(1);
    this.apiCallStream(holder).subscribe();

    return this.zone.runOutsideAngular(() => {
      const editor = new this.editorJs(config);
      return editor.isReady.then(() => {
        return this.zone.run(() => {
          this.setEditor(holder, editor);
          this.ref.tick();
        });
      });
    });
  }

  /**
   * Get the editor instance
   */
  public getEditor(holder: string): Observable<EditorJS> {
    if (!this.editorMap[holder]) {
      this.editorMap[holder] = new BehaviorSubject<EditorJS | undefined>(undefined);
    }
    return this.editorMap[holder].pipe(filter(editor => typeof editor !== 'undefined'));
  }

  /**
   * Set the editor instance
   * @param editor The EditorJS instance
   */
  public setEditor(holder: string, editor: EditorJS) {
    if (!this.editorMap[holder]) {
      this.editorMap[holder] = new BehaviorSubject<EditorJS | undefined>(undefined);
    }
    this.editorMap[holder].next(editor);
  }

  /**
   * Returns an API stream of values
   * @param holder The holder of the stream
   */
  public apiCallStream(holder: string): Observable<any> {
    if (!this.apiValueMap[holder]) {
      this.apiValueMap[holder] = new ReplaySubject<any>(undefined);
    }
    return this.apiValueMap[holder].asObservable();
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
  public apiCall(options: InjectorApiCallOptions, ...args: any[]): void {
    const { holder, method } = options;
    this.getEditor(options.holder).pipe(
      take(1),
      tap(editor => {
        let fn: any;
        if (!options.namespace) {
          fn = editor[method];
        } else {
          fn = editor[options.namespace][method];
        }
        if (!fn) {
          throw new Error(`No method ${options.method} ${options.namespace ? 'in ' + options.namespace : ''}`);
        }
        this.zone.runOutsideAngular(() => {
          const result = fn.call(editor, ...args);

          this.zone.run(() => {
            result.then((response: any) => {
              if (!response || (response && !response.then)) {
                this.apiValueMap[holder].next({ holder, result: response });
              } else {
                response.then(final => this.apiValueMap[holder].next({ holder, result: final }));
              }
            });
          });
        });
      })
    );
  }

  public save(options: InjectorMethodOption) {
    this.apiCall({ ...options, namespace: 'saver', method: 'save' });
  }

  public update(options: InjectorMethodOption, data: OutputData) {
    this.apiCall({ ...options, namespace: 'blocks', method: 'render' }, data);
  }

  public clear(options: InjectorMethodOption) {
    this.apiCall({ ...options, namespace: 'blocks', method: 'clear' });
  }

  /**
   * Call this method to destroy the Editor JS instance
   */
  public destroy(holder: string) {
    this.getEditor(holder)
      .pipe()
      .subscribe(editor => editor.destroy());
    this.editorMap[holder].complete();
  }

  public destroyAll(): void {
    Object.keys(this.editorMap).forEach(holder => this.destroy(holder));
  }
}
