import EditorJS, { OutputData } from '@editorjs/editorjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

export class EditorJSInstance {
  /**
   * Private Editor Instance
   */
  private readonly editorInstance$ = new BehaviorSubject<EditorJS | undefined>(undefined);

  /**
   * Get the editor instance
   */
  public get editorInstance(): Observable<EditorJS> {
    return this.editorInstance$.pipe(filter(editor => typeof editor !== 'undefined'));
  }

  /**
   * Set the editor instance
   * @param editor The EditorJS instance
   */
  public setEditor(editor: EditorJS) {
    this.editorInstance$.next(editor);
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
  public hasChanged(data: OutputData): void {
    this.lastChange$.next(data);
  }

  public destroy() {
    this.editorInstance.pipe(take(1)).subscribe(editor => editor.destroy());
  }
}
