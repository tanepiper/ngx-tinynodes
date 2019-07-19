import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewRef
} from '@angular/core';
import { NgxEditorJSService } from '../../services/editorjs.service';
import { InjectorApiCallOptions } from '../../types/injector';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-editorjs-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: [ 'toolbar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxEditorJSToolbarComponent implements AfterContentInit, OnChanges {

  @ViewChild('toolbar', { static: true }) private readonly toolbarEl: ElementRef;

  @Input()
  holder: ViewRef | any;

  public buttons: any = [];

  private readonly onDestroy$ = new Subject<boolean>();

  constructor(private readonly editorService: NgxEditorJSService, private readonly cd: ChangeDetectorRef, private readonly renderer: Renderer2) {

  }

  private autoSave$ = new BehaviorSubject<number>(0);

  public get autosave() {
    return this.autoSave$.asObservable();
  }

  @HostListener('click')
  onFocus() {
    this.renderer.addClass(this.toolbarEl.nativeElement, 'active');
  }

  public action<T>(options: InjectorApiCallOptions) {
    return this.editorService.apiCall<T>(options);
  }

  public get hasSaved(): Observable<boolean> {
    return this.editorService.hasSaved({ holder: this.holder.holder });
  }

  public editorFocused(): Observable<boolean> {
    return this.holder.isFocused;
  }

  public get blockCount(): Observable<number> {
    return this.editorService.lastChange({ holder: this.holder.holder }).pipe(
      map(change => change.blocks && change.blocks.length || 0)
    );
  }

  public clear() {
    this.editorService.clear({ holder: this.holder.holder }).pipe(take(1)).subscribe();
  }

  public toggleAutosave() {
    this.autoSave$.next(!this.autoSave$.value ? 5000 : 0);
    this.holder.autosave = this.autoSave$.value;
  }

  ngAfterContentInit(): void {
    this.holder.isFocused.pipe(takeUntil(this.onDestroy$)).subscribe(focused => {
      if (focused) {
        this.renderer.addClass(this.toolbarEl.nativeElement, 'active');
      } else {
        this.renderer.removeClass(this.toolbarEl.nativeElement, 'active');
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cd.markForCheck();
  }
}
