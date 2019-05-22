import { ApplicationRef, Inject, Injectable, NgZone } from '@angular/core';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { EditorJSInstance, EditorJSInstanceConfig, InjectorMethodOption, MAP_DEFAULTS } from '../types/injector';
import { ChangeMap, EditorJSChange, EditorMap, ReadyMap } from '../types/maps';

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
   * Internal map of all EditorJS ready states
   */
  private isReadyMap: ReadyMap = {};

  /**
   * Internal map of all EditorJS change states
   */
  private hasChangedMap: ChangeMap = {};

  /**
   * Import the `EditorJS` class
   * @param editorJs The `EditorJS` class
   * @param zone Angular zone to run
   * @param ref The application reference to trigger a tick
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
        return this.zone.run(() => {
          this.setupSubjects({ holder, editor });
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
  public onChange(options: InjectorMethodOption): () => void {
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
  public onReady(options: InjectorMethodOption): () => void {
    return () => {
      if (!this.isReadyMap[options.holder]) {
        this.isReadyMap[options.holder] = new BehaviorSubject<boolean>(false);
      }
      this.isReadyMap[options.holder].next(true);
    };
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
          if (triggerUpdate) {
            this.zone.run(() => {
              this.hasChangedMap[options.holder].next(data);
            });
          }
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
   * Returns an Observable value of an `EditorJS` instance
   * @param holder The holder ID of the `EditorJS` instance
   */
  public hasChanged(options: InjectorMethodOption): Observable<OutputData> {
    if (!this.hasChangedMap[options.holder]) {
      this.hasChangedMap[options.holder] = new BehaviorSubject<OutputData>({ time: 0, blocks: [] });
    }
    return this.hasChangedMap[options.holder].asObservable();
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
  private setupSubjects({ holder, editor }: InjectorMethodOption): void {
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
  }

  /**
   * Handles cleaning up all the subjects once an `EditorJS` instance has been
   * destroyed
   * @param holder The holder ID for the `EditorJS` instance
   */
  private cleanupSubjects(options: InjectorMethodOption) {
    MAP_DEFAULTS.forEach(([mapKay, value]: [string, any]) => {
      if (this[mapKay][options.holder]) {
        this[mapKay][options.holder].next(value);
        this[mapKay][options.holder].complete();
        this[mapKay][options.holder] = null;
        delete this[mapKay][options.holder];
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
