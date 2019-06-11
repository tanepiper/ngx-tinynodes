import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { NgxHidableHeaderDirective } from '@tinynodes/ngx-hidable-header';
import { FormBuilder } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tinynodes-ngx-hidable-header-demo',
  templateUrl: './ngx-hidable-header-demo.component.html',
  styleUrls: [ './ngx-hidable-header-demo.component.css' ]
})
export class NgxHidableHeaderDemoComponent implements AfterViewInit, OnDestroy {

  disable = new BehaviorSubject<boolean>(false);
  reverse = new BehaviorSubject<boolean>(false);

  private onDestroy$ = new Subject<boolean>();

  @ViewChild(NgxHidableHeaderDirective, { static: true }) hidableElement: NgxHidableHeaderDirective;

  public demoControls = this.fb.group({
    disable: [ false ],
    reverse: [ false ],
    hideTransitionTime: [ 2 ],
    hideTransition: [ 'cubic-bezier(.29,1.93,.85,-0.98)' ],
    showTransitionTime: [ 1 ],
    showTransition: [ 'ease-in' ],
    scrollAt: [ 200 ]
  });

  public transitions = [
    [ 'linear', 'Linear' ],
    [ 'ease', 'Ease' ],
    [ 'ease-in', 'Ease In' ],
    [ 'ease-out', 'Ease Out' ],
    [ 'ease-in-out', 'Ease-in-out' ],
    [ 'cubic-bezier(0.5, 0.31, 0.84, 0.05)', 'Cubic Bezier 1' ],
    [ 'cubic-bezier(.29,1.93,.85,-0.98)', 'Cubic Bezier 2' ]
  ];

  public transition = '';

  constructor(private readonly fb: FormBuilder) {
  }

  public hide() {
    this.hidableElement.hide();
  }

  show() {
    this.hidableElement.show();
  }

  ngAfterViewInit() {
    combineLatest([this.hidableElement.isHidden, this.disable])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(([ isHidden, isDisabled ]) => {
        if (isHidden) {
          this.transition = `${ this.demoControls.value.hideTransitionTime }s ${ this.demoControls.value.hideTransition }`;
        } else {
          this.transition = `${ this.demoControls.value.showTransitionTime }s ${ this.demoControls.value.showTransition }`;
        }

        if (isHidden && isDisabled) {
          this.hidableElement.show();
        }
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

}
