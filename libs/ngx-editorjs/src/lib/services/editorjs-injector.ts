import { ApplicationRef, Inject, Injectable, InjectionToken, NgZone } from '@angular/core';
import EditorJS, { EditorConfig } from '@editorjs/editorjs';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Block } from '../types/blocks';
import { BlocksMap, ChangeMap, EditorMap, EventMap, EventType, ReadyMap } from '../types/maps';

/**
 * Configuration for creating an EditorJS instance
 */
export interface EditorJSInstanceConfig {
  /**
   * The editor configuration, this is required with at least the `holder` property
   */
  editorConfig: EditorConfig;
  /**
   * The method to call when the editor makes a change
   */
  onChange?: (holder?: string) => void;

  /**
   * The method to call with an editor is ready
   */
  onReady?: (holder?: string) => void;
}

/**
 * Default values for each internal map
 */
const MAP_DEFAULTS = [['blocksMap', []], ['changeMap', 0], ['readyMap', false]];

/**
 * Injection token for the EditorJS class
 */
export const EDITORJS_MODULE_IMPORT = new InjectionToken<any>('EDITORJS_MODULE_IMPORT');

export const EditorJSInstance = new InjectionToken<any>('EditorJSInstance');

/**
 * EditorJS factory service, call `createInstance` with an `EditorConfig` to
 * return an instance after the DOM element is ready, this is stored in a subject to
 * be retrieved when ready.
 */
@Injectable({
  providedIn: 'root'
})
export class NgxEditorJSInstanceService {
  static nextIdValue = 0;

  get idValue() {
    NgxEditorJSInstanceService.nextIdValue++;
    return NgxEditorJSInstanceService.nextIdValue;
  }
  /**
   * Internal destroy method for the service
   */
  private onDestroy$ = new Subject<boolean>();

  /**
   * Internal map of all EditorJS instances
   */
  private editorMap: EditorMap = {};

  /**
   * Internal map of all Block `BehaviorSubject` instances
   */
  private blocksMap: BlocksMap = {};

  /**
   * Internal map of all EditorJS ready states
   */
  private readyMap: ReadyMap = {};

  /**
   * Internal map of all EditorJS change states
   */
  private changeMap: ChangeMap = {};

  /**
   * The Event map is used to trigger events
   */
  private eventMap: EventMap = {};

  /**
   * Import the `EditorJS` class
   * @param EditorJS The `EditorJS` class
   * @param zone Angular zone to run
   * @param ref The application reference to trigger a tick
   */
  constructor(
    @Inject(EditorJSInstance) private EditorJS: any,
    private readonly zone: NgZone,
    private readonly ref: ApplicationRef
  ) {}

  /**
   * Creates a new `EditorJS` instance outside of the Angular zone and
   * then adds it to the editor instances
   * @param config The {EditorConfig} configuration to create
   */
  public createInstance(config: EditorJSInstanceConfig): Promise<void> {
    const editorConfig = {
      ...config.editorConfig
    };
    editorConfig.onChange = (config.onChange ? config.onChange : this.onChange(editorConfig.holder as string)) as any;
    editorConfig.onReady = (config.onReady ? config.onReady : this.onReady(editorConfig.holder as string)) as any;
    return this.zone.runOutsideAngular(() => {
      const editor = new (this.EditorJS as any)(editorConfig);
      const holder = editorConfig.holder as string;
      return editor.isReady.then(() => {
        return this.zone.run(() => {
          this.setupSubjects(holder, editor);
          this.setupEvents(holder);
          this.readyMap[holder].next(true);
          this.ref.tick();
        });
      });
    });
  }

  private onChange(holder: string): void {
    if (!this.changeMap[holder]) {
      this.changeMap[holder] = new BehaviorSubject<number>(Date.now());
    }
    this.changeMap[holder].next(Date.now());
  }

  private onReady(holder: string) {
    if (!this.readyMap[holder]) {
      this.readyMap[holder] = new BehaviorSubject<boolean>(false);
    }
    this.readyMap[holder].next(true);
  }

  /**
   * Calls the save method on an editor
   * @param holder The holder ID of the `EditorJS` instance
   */
  public save(holder: string) {
    this.eventMap[holder].next({ type: 'save' });
  }

  /**
   * Calls a clear method on an editor
   * @param holder The holder ID of the `EditorJS` instance
   */
  public clear(holder: string) {
    this.eventMap[holder].next({ type: 'clear' });
  }

  /**
   * Updates the editor with new blocks
   * @param holder The holder ID of the `EditorJS` instance
   * @param blocks The blocks to update the editor with
   */
  public update(holder: string, blocks: Block[]) {
    if (!this.eventMap[holder]) {
      this.eventMap[holder] = new BehaviorSubject<EventType>({ type: '' });
    }
    this.eventMap[holder].next({ type: 'update', payload: { blocks } });
  }

  /**
   * Returns an Observable value of an `EditorJS` instance
   * @param holder The holder ID of the `EditorJS` instance
   */
  public getInstance(holder: string): Observable<EditorJS> {
    if (!this.editorMap[holder]) {
      this.editorMap[holder] = new BehaviorSubject<EditorJS | undefined>(undefined);
    }
    return this.editorMap[holder].asObservable();
  }

  /**
   * Returns an Observable value of an `EditorJS` instance
   * @param holder The holder ID of the `EditorJS` instance
   */
  public getReady(holder: string): Observable<boolean> {
    if (!this.readyMap[holder]) {
      this.readyMap[holder] = new BehaviorSubject<boolean>(false);
    }
    return this.readyMap[holder].asObservable();
  }

  /**
   * Returns an Observable value of an `EditorJS` instance
   * @param holder The holder ID of the `EditorJS` instance
   */
  public getChanged(holder: string): Observable<number> {
    if (!this.changeMap[holder]) {
      this.changeMap[holder] = new BehaviorSubject<number>(0);
    }
    return this.changeMap[holder].asObservable();
  }

  /**
   * Returns an Observable value of an `EditorJS` instance
   * @param holder The holder ID of the `EditorJS` instance
   */
  public getBlocks(holder: string): Observable<Block[]> {
    if (!this.blocksMap[holder]) {
      this.blocksMap[holder] = new BehaviorSubject<Block[]>([]);
    }
    return this.blocksMap[holder].asObservable();
  }

  /**
   * Destroys an instance of an editor and cleans up all Observable values
   * @param holder The holder ID of the `EditorJS` instance
   */
  public destroyInstance(holder: string): void {
    const instanceDestroyed = new Subject<boolean>();
    this.editorMap[holder]
      .pipe(
        filter(editor => typeof editor !== 'undefined'),
        takeUntil(instanceDestroyed)
      )
      .subscribe(editor => {
        this.zone.runOutsideAngular(() => {
          editor.destroy();
          this.zone.run(() => {
            this.cleanupSubjects(holder);
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
  private setupSubjects(holder: string, editor: EditorJS): void {
    if (this.editorMap[holder]) {
      this.editorMap[holder].next(editor);
    } else {
      this.editorMap[holder] = new BehaviorSubject<EditorJS>(editor);
    }
    MAP_DEFAULTS.forEach(([mapKay, value]: [string, typeof value]) => {
      if (!this[mapKay][holder]) {
        this[mapKay][holder] = new BehaviorSubject<typeof value>(value);
      }
      this[mapKay][holder].next(value);
    });
    if (!this.eventMap[holder]) {
      this.eventMap[holder] = new BehaviorSubject<EventType>({ type: '' });
    }
  }

  /**
   * Sets up a listener for the event map and provides the editor and blocks to handle
   * updates
   * @param holder The holder ID of the `EditorJS` instance
   */
  private setupEvents(holder: string) {
    combineLatest([this.eventMap[holder], this.editorMap[holder]])
      .pipe(
        filter(([event, editor]) => event.type && typeof editor !== 'undefined'),
        takeUntil(this.onDestroy$)
      )
      .subscribe(([event, editor]) => {
        if (event.type === 'save') {
          this.saveHandler(holder, editor);
        }
        if (event.type === 'clear') {
          this.clearHandler(holder, editor);
        }
        if (event.type === 'update') {
          this.updateHandler(holder, editor, event.payload.blocks);
        }
        this.eventMap[holder].next({ type: '' });
      });
    this.ref.tick();
  }

  /**
   * Handles cleaning up all the subjects once an `EditorJS` instance has been
   * destroyed
   * @param holder The holder ID for the `EditorJS` instance
   */
  private cleanupSubjects(holder: string) {
    MAP_DEFAULTS.forEach(([mapKay, value]: [string, any]) => {
      if (this[mapKay][holder]) {
        this[mapKay][holder].next(value);
        this[mapKay][holder].complete();
        this[mapKay][holder] = null;
        delete this[mapKay][holder];
      }
    });
    this.eventMap[holder].next({ type: '' });
    this.eventMap[holder].complete();
    this.eventMap[holder] = null;
    delete this.eventMap[holder];
    this.editorMap[holder] = null;
    delete this.editorMap[holder];
  }

  /**
   * Call this to destroy all subscriptions within the service
   */
  public destroy() {
    Object.keys(this.editorMap).forEach(key => {
      this.destroyInstance(key);
    });
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  /**
   * This internal handler calls the `EditorJS` instance save outside of the
   * Angular zone, this means it will not trigger change detection
   * @param holder The holder ID for the `EditorJS` instance
   * @param editor The `EditorJS` instance
   * @param blocks The {Block} items to render
   */
  private saveHandler(holder: string, editor: EditorJS) {
    this.zone.runOutsideAngular(() => {
      editor.saver.save().then(data => {
        this.zone.run(() => {
          this.blocksMap[holder].next(data.blocks);
        });
      });
    });
  }

  /**
   * This internal handler calls the `EditorJS` instance clear outside of the
   * Angular zone, this means it will not trigger change detection
   * @param holder The holder ID for the `EditorJS` instance
   * @param editor The `EditorJS` instance
   * @param blocks The {Block} items to render
   */
  private clearHandler(holder: string, editor: EditorJS) {
    this.zone.runOutsideAngular(() => {
      editor.blocks.clear();
      this.zone.run(() => {
        this.blocksMap[holder].next([]);
        this.changeMap[holder].next(Date.now());
      });
    });
  }

  /**
   * This internal handler calls the `EditorJS` instance render outside of the
   * Angular zone, this means it will not trigger change detection
   * @param holder The holder ID for the `EditorJS` instance
   * @param editor The `EditorJS` instance
   * @param blocks The {Block} items to render
   */
  private updateHandler(holder: string, editor: EditorJS, blocks: Block[]) {
    if (!blocks) {
      return;
    }
    this.zone.runOutsideAngular(() => {
      editor.blocks.render({
        time: Date.now(),
        version: EditorJS.version,
        blocks
      });
      this.zone.run(() => {
        this.blocksMap[holder].next(blocks);
        this.changeMap[holder].next(Date.now());
      });
    });
  }
}
