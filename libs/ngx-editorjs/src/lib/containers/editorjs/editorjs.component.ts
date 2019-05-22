import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
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
  styleUrls: ['editorjs.component.scss']
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
  constructor(protected readonly service: NgxEditorJSService, protected readonly fm: FocusMonitor) {
    super(service, fm);
  }

  ngAfterContentInit() {
    this.getFocusMonitor(this.editorEl.element)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(focused => {
        this.onTouch();
      });
  }

  ngOnDestroy(): void {
    this.fm.stopMonitoring(this.editorEl.element);
    if (this.timerSubscription$ && !this.timerSubscription$.closed) {
      this.timerSubscription$.unsubscribe();
    }
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
