import {
  Component,
  Input,
  TemplateRef,
  AfterContentInit,
  ElementRef,
  Renderer2,
  Host,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { Panel } from '../../types/panel';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';
import { TiltedScrollContainerComponent } from '../../containers/tilted-scroll-container/tilted-scroll-container.component';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-tilted-scroll-panel',
  templateUrl: 'tilted-scroll-panel.component.html',
  styleUrls: ['tilted-scroll-panel.component.scss']
})
export class TiltedScrollPanelComponent implements AfterContentInit, OnDestroy {
  /**
   * The panel child
   */
  @ViewChild('panelEl', { read: ElementRef }) panelEl: ElementRef;

  /**
   * The wrapper child
   */
  @ViewChild('wrapperEl', { read: ElementRef }) wrapperEl: ElementRef;

  private onDestroy$ = new Subject<boolean>();

  private lastScrollTop = 0;

  /**
   * The panel data being passed to render
   */
  @Input()
  panel: Panel;

  /**
   * The template reference for the panel component
   */
  @Input()
  panelTemplate: TemplateRef<any>;

  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2,
    private readonly scroll: ScrollDispatcher,
    @Host() private parent: TiltedScrollContainerComponent
  ) {}

  ngAfterContentInit() {
    this.parent.scroll.pipe(takeUntil(this.onDestroy$)).subscribe((scroll: number) => {
      if (this.isElementInViewport(scroll)) {
        this.renderer.addClass(this.wrapperEl.nativeElement, 'in-view');
      } else {
        this.renderer.removeClass(this.wrapperEl.nativeElement, 'in-view');
      }
      this.animate(scroll);
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  private isElementInViewport(scrollValue: number) {
    const childOffsetTop = this.wrapperEl.nativeElement.getBoundingClientRect().top;
    const parentOffsetTop = this.parent.element.getBoundingClientRect().top;
    const childHeight = this.wrapperEl.nativeElement.offsetHeight;
    const parentHeight = this.parent.element.offsetHeight;
    return !(childHeight >= parentOffsetTop && childOffsetTop <= parentHeight);
  }

  private animate(scrollValue: number) {
    console.log('top', this.parent.viewport.measureScrollOffset('top'));
    console.dir(this.panelEl.nativeElement);
    console.log('Height 2', this.parent.viewport.elementRef.nativeElement.offsetHeight);

    let opacity = 0;
    let degrees =
      ((this.parent.viewport.measureScrollOffset('top') - this.panelEl.nativeElement.offsetHeight - scrollValue) /
        window.innerHeight) *
      (50 * 3);
    let scale =
      (scrollValue +
        window.innerHeight -
        (this.parent.viewport.measureScrollOffset('top') -
          this.parent.viewport.elementRef.nativeElement.offsetHeight)) /
      window.innerHeight;
    if (scale > 1) scale = 1;
    if (degrees < 0) degrees = 0;

    console.log(scrollValue, this.lastScrollTop);
    if (scrollValue > this.lastScrollTop) {
      opacity =
        (this.parent.viewport.measureScrollOffset('top') + (window.innerHeight * 1.2 - scrollValue)) /
        window.innerHeight;
      opacity = Math.pow(opacity, 25);
      degrees = ((this.parent.viewport.measureScrollOffset('top') - scrollValue) / window.innerHeight) * (50 * 3);
      scale = (scrollValue + window.innerHeight - this.parent.viewport.measureScrollOffset('top')) / window.innerHeight;
    } else {
      // prettier-ignore
      opacity =
        scrollValue + window.innerHeight - this.parent.viewport.measureScrollOffset('top') + (this.wrapperEl.nativeElement.offsetTop / 2) / window.innerHeight;

      degrees = 0;
      scale = 1;
    }

    this.lastScrollTop = scrollValue;

    this.renderer.setStyle(
      this.wrapperEl.nativeElement,
      'transform',
      `rotateX(${degrees}deg) scale(${scale}, ${scale})`
    );
  }
}
