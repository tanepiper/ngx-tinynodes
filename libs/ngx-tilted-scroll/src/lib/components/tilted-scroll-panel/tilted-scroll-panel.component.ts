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
    console.log(scrollValue);
    const childOffsetTop = this.wrapperEl.nativeElement.getBoundingClientRect().top;
    const parentOffsetTop = this.parent.element.getBoundingClientRect().top;
    const childHeight = this.wrapperEl.nativeElement.offsetHeight;
    const parentHeight = this.parent.element.offsetHeight;
    return !(childHeight >= parentOffsetTop && childOffsetTop <= parentHeight);
  }

  private animate(scrollValue: number) {
    //console.dir(this.parent.element, this.panelEl.nativeElement, this.wrapperEl.nativeElement);
    let opacity = 0;
    let degrees =
      ((this.parent.element.offsetTop - this.parent.element.offsetHeight - scrollValue) / window.innerHeight) *
      (50 * 3);
    let scale =
      (scrollValue + window.innerHeight - (this.parent.element.offsetTop - this.parent.element.offsetHeight)) /
      window.innerHeight;
    if (scale > 1) scale = 1;
    if (degrees < 0) degrees = 0;

    if (scrollValue > this.parent.element.offsetTop) {
      opacity = (this.parent.element.offsetTop + (window.innerHeight * 1.2 - scrollValue)) / window.innerHeight;
      console.log('opacity 1', opacity);
      opacity = Math.pow(opacity, 25);
      console.log('opacity 2', opacity);
      degrees = ((this.parent.element.offsetTop - scrollValue) / window.innerHeight) * (50 * 3);
      scale = (scrollValue + window.innerHeight - this.parent.element.offsetTop) / window.innerHeight;
    } else {
      // prettier-ignore
      opacity =
        scrollValue + window.innerHeight - this.parent.element.offsetTop + (this.wrapperEl.nativeElement.offsetTop / 2) / window.innerHeight;
      console.log(
        'opacity 3',
        opacity,
        scrollValue,
        window.innerHeight,
        this.parent.element.offsetTop,
        this.wrapperEl.nativeElement.offsetTop
      );
      degrees = 0;
      scale = 1;
    }
    console.log(degrees, scale, opacity, scrollValue);

    this.renderer.setStyle(
      this.wrapperEl.nativeElement,
      'transform',
      `rotateX(${degrees}deg) scale(${scale}, ${scale})`
    );
  }
}
