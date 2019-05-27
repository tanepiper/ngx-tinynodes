import EditorJS, { OutputData } from '@editorjs/editorjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { InjectorApiCallResponse, InjectorApiCallOptions } from '../types/injector';

export class EditorJSInstance {
  /**
   * Internal EditorJS instance
   */
  private editorJSInstance: EditorJS | undefined;

  /**
   * Get the editor instance
   */
  public get editorInstance(): EditorJS | undefined {
    return this.editorJSInstance;
  }

  /**
   * Set the editor instance
   * @param editor The EditorJS instance
   */
  public setEditor(editor: EditorJS) {
    this.editorJSInstance = editor;
  }

  /**
   * Private isReady state
   */
  private readonly isReady$ = new BehaviorSubject<boolean>(false);

  /**
   * Get the isReady state
   */
  public get isReady(): Observable<boolean> {
    return this.isReady$.asObservable();
  }
  /**
   * Set the isReady state
   * @param readyState
   */
  public setIsReady(readyState: boolean): void {
    this.isReady$.next(readyState);
  }

  /**
   * The last change state
   */
  private readonly lastChange$ = new BehaviorSubject<OutputData>({ blocks: [] });

  public apiCall<T>(options: InjectorApiCallOptions, ...args: any[]): Promise<InjectorApiCallResponse<T>> {
    const { method } = options;

    let fn: any;
    if (!options.namespace) {
      fn = this.editorJSInstance[method];
    } else {
      fn = this.editorJSInstance[options.namespace][method];
    }
    if (!fn) {
      throw new Error(`No method ${options.method} ${options.namespace ? 'in ' + options.namespace : ''}`);
    }
    const result = fn.call(this.editorJSInstance, ...args);

    if (!result || (result && !result.then)) {
      Promise.resolve().then(() => ({
        ...options,
        instance: this.editorJSInstance,
        result: typeof result === 'undefined' ? {} : result
      }));
    } else {
      return result.then((r: T) => ({ ...options, instance: this.editorJSInstance, result: r }));
    }
  }

  /**
   * The last change
   */
  public get lastChange(): Observable<OutputData> {
    return this.lastChange$.asObservable();
  }

  /**
   * Update when the editor has changed
   * @param data The data from the change
   */
  public setLastChange(data: OutputData): void {
    this.lastChange$.next(data);
  }

  /**
   * Call this method to destroy the Editor JS instance
   */
  public destroy() {
    this.lastChange$.complete();
    this.isReady$.complete();
    this.editorJSInstance.destroy();
  }
}
