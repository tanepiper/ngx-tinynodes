import {
  AfterContentInit,
  Component,
  ElementRef,
  Host,
  Input,
  OnDestroy,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil, combineLatest, filter, withLatestFrom, distinctUntilChanged, tap } from 'rxjs/operators';
import { TiltedScrollContainerComponent } from '../../containers/tilted-scroll-container/tilted-scroll-container.component';
import { Panel, ScrollEvent } from '../../types/panel';

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

  /**
   * Private destroyer for observables
   */
  private onDestroy$ = new Subject<boolean>();

  /**
   * Last scroll top value
   */
  private lastScrollTop$ = new BehaviorSubject<number>(0);

  /**
   * Scroll event
   */
  private scrollEvent$ = new BehaviorSubject<ScrollEvent | undefined>(undefined);

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

  constructor(private readonly renderer: Renderer2, @Host() private parent: TiltedScrollContainerComponent) {}

  ngAfterContentInit() {
    this.parent.scroll.pipe(takeUntil(this.onDestroy$)).subscribe((scroll: ScrollEvent) => {
      this.scrollEvent$.next(scroll);
    });

    this.scrollEvent$
      .pipe(
        filter(scrollEvent => typeof scrollEvent !== 'undefined'),
        tap(scrollEvent => this.lastScrollTop$.next(scrollEvent.scrollTop)),
        takeUntil(this.onDestroy$),
        withLatestFrom(this.lastScrollTop$.pipe(distinctUntilChanged()))
      )
      .subscribe(([scrollEvent, lastScroll]) => {
        if (this.isElementInViewport(scrollEvent)) {
          this.renderer.addClass(this.wrapperEl.nativeElement, 'in-view');
        } else {
          this.renderer.removeClass(this.wrapperEl.nativeElement, 'in-view');
        }
        this.animate(scrollEvent, lastScroll);
      });

    combineLatest([this.scrollEvent$, this.lastScrollTop$]);
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  public styleGenerate(imageUrl: string) {
    return {
      'background-image': `url(${imageUrl})`,
      'background-size': 'cover',
      width: '100%',
      height: '500px'
    };
  }

  private isElementInViewport(scrollEvent: ScrollEvent) {
    const wrapperOffsetTop = this.wrapperEl.nativeElement.getBoundingClientRect().top;
    const childHeight = this.wrapperEl.nativeElement.offsetHeight;
    console.log(
      wrapperOffsetTop,
      childHeight,
      scrollEvent.viewportRect.top,
      scrollEvent.viewportRect.bottom,
      childHeight >= scrollEvent.viewportRect.bottom && wrapperOffsetTop <= scrollEvent.viewportRect.top,
      wrapperOffsetTop >= 200,
      wrapperOffsetTop <= scrollEvent.viewportRect.bottom
    );
    return childHeight >= scrollEvent.viewportRect.bottom && wrapperOffsetTop >= scrollEvent.viewportScrollPosition.top;
  }

  private animate(scrollEvent: ScrollEvent, lastScroll: number) {
    // console.log('top', this.parent.viewport.measureScrollOffset('top'));
    // console.dir(this.panelEl.nativeElement);
    // console.log('Height 2', this.parent.viewport.elementRef.nativeElement.offsetHeight);

    let opacity = 0;
    let degrees =
      ((scrollEvent.viewportRect.top - this.panelEl.nativeElement.offsetHeight - scrollEvent.scrollTop) /
        scrollEvent.viewportRect.height) *
      (50 * 3);
    let scale =
      (scrollEvent.scrollTop +
        window.innerHeight -
        (this.parent.viewport.measureScrollOffset('top') -
          this.parent.viewport.elementRef.nativeElement.offsetHeight)) /
      window.innerHeight;
    if (scale > 1) scale = 1;
    if (degrees < 0) degrees = 0;

    // console.log(scrollEvent.scrollTop, this.lastScrollTop);
    if (scrollEvent.scrollTop > lastScroll) {
      opacity =
        (this.parent.viewport.measureScrollOffset('top') + (window.innerHeight * 1.2 - scrollEvent.scrollTop)) /
        window.innerHeight;
      opacity = Math.pow(opacity, 25);
      degrees =
        ((this.parent.viewport.measureScrollOffset('top') - scrollEvent.scrollTop) / window.innerHeight) * (50 * 3);
      scale =
        (scrollEvent.scrollTop + window.innerHeight - this.parent.viewport.measureScrollOffset('top')) /
        window.innerHeight;
    } else {
      // prettier-ignore
      opacity =
        scrollEvent.scrollTop +
        window.innerHeight -
        this.parent.viewport.measureScrollOffset('top') +
        this.wrapperEl.nativeElement.offsetTop / 2 / window.innerHeight;

      degrees = 0;
      scale = 1;
    }

    this.renderer.setStyle(
      this.wrapperEl.nativeElement,
      'transform',
      `rotateX(${degrees}deg) scale(${scale}, ${scale})`
    );
  }
}
