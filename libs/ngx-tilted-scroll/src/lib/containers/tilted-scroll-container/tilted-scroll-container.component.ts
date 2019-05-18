import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { Panel, ScrollEvent } from '../../types/panel';
import {
  ScrollDispatcher,
  CdkScrollable,
  CdkVirtualScrollViewport,
  ViewportRuler,
  ViewportScrollPosition
} from '@angular/cdk/scrolling';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ViewportScroller } from '@angular/common';

/**
 * The `TiltedScrollContainerComponent` is used to render a set of panels from data
 */
@Component({
  selector: 'ngx-tilted-scroll-container',
  templateUrl: 'tilted-scroll-container.component.html',
  styleUrls: ['tilted-scroll-container.component.scss']
})
export class TiltedScrollContainerComponent {
  @ViewChild('scrollViewport') private scrollViewport: CdkVirtualScrollViewport;

  private scrollEvent$ = new BehaviorSubject<ScrollEvent | undefined>(undefined);
  /**
   * The panels to render inside the component
   */
  @Input()
  panels: Panel[];

  @Input()
  itemSize = 1;

  constructor(
    private readonly el: ElementRef,
    private readonly scrollDispatcher: ScrollDispatcher,
    private readonly ruler: ViewportRuler,
    private readonly position: ViewportScroller
  ) {}

  public get viewport(): CdkVirtualScrollViewport {
    return this.scrollViewport;
  }

  public get scroll(): Observable<ScrollEvent> {
    return this.scrollEvent$.pipe(filter(event => typeof event !== 'undefined'));
  }

  public get element(): HTMLElement {
    return this.el.nativeElement;
  }

  public get isScrolling(): Observable<void | CdkScrollable> {
    return this.scrollDispatcher.scrolled();
  }

  public scrollChange(scrollTop: number) {
    console.log(this.ruler.getViewportSize(), this.ruler.getViewportRect(), this.ruler.getViewportScrollPosition());
    this.scrollEvent$.next({
      scrollTop,
      viewportSize: this.ruler.getViewportSize(),
      viewportRect: this.ruler.getViewportRect(),
      viewportScrollPosition: this.ruler.getViewportScrollPosition()
    });
  }

  public trackByIdx(i: number): number {
    return i;
  }
}
