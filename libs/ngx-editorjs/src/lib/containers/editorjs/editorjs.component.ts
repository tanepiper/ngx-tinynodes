import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { NgxEditorJSDirective } from '../../directives/ngx-editorjs.directive';
import { NgxEditorJSService } from '../../services/editorjs.service';
import { NgxEditorJSBaseComponent } from '../base/container.class';

/**
 * This component is provided as a shortcut to using EditorJS in your
 * application. The attributes are optional and without a default component
 * will be created
 *
 * @example
 * <ngx-editorjs holder="my-editor"></ngx-editorjs>
 */
@Component({
  selector: 'ngx-editorjs',
  templateUrl: 'editorjs.component.html',
  styleUrls: ['editorjs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxEditorJSComponent extends NgxEditorJSBaseComponent {
  /**
   * Access to the underlying editor directive
   */
  @ViewChild(NgxEditorJSDirective) public editorEl: NgxEditorJSDirective;

  /**
   * Constructs the Editor component
   * @param service The NgxEditorJSService instance
   */
  constructor(
    protected readonly service: NgxEditorJSService,
    protected readonly fm: FocusMonitor,
    protected readonly cd: ChangeDetectorRef
  ) {
    super(service, fm, cd);
  }

  /**
   * Set up the focus monitor for the editor touch status
   */
  ngAfterContentInit() {
    this.getFocusMonitor(this.editorEl.element)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(focused => {
        this.isTouched.emit(true);
        this.onTouch();
        this.cd.markForCheck();
      });
  }

  /**
   * Destroy the monitor and subscription and call the onDestroy$ subject
   */
  ngOnDestroy(): void {
    this.fm.stopMonitoring(this.editorEl.element);
    if (this.timerSubscription$ && !this.timerSubscription$.closed) {
      this.timerSubscription$.unsubscribe();
    }
    if (!this.onDestroy$.closed) {
      this.onDestroy$.next(true);
      this.onDestroy$.complete();
    }
  }
}
