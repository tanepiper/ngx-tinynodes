import {
  AfterContentInit, ChangeDetectorRef,
  Directive,
  ElementRef,
  HostBinding, HostListener,
  Inject,
  Input, OnChanges, OnDestroy,
  PLATFORM_ID,
  Renderer2, SimpleChange, SimpleChanges
} from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { HideableHeaderProperties } from '../../types/hidable-header';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

export type ContainerType = 'window' | 'document' | 'body' | string;

@Directive({
  selector: '[ngxHidableHeader]'
})
export class NgxHidableHeaderDirective  implements AfterContentInit, OnChanges, OnDestroy {

  private lastScrollTop = 0;

  private scrollListener: any;

  /**
   * Height to transition the element by. Default is the `clientHeight` of the element.
   */
  @Input()
  public height = 0;

  /**
   * The type of CSS unit to transition with, default is 'px' (pixels)
   */
  @Input()
  public units = 'px';

  /**
   * Disable the functionality of the directive.
   */
  @Input()
  public disable = false;

  /**
   * Instead of hiding the header on scroll, this will make the header appear on scroll from a hidden position.
   * Useful for utility bars.
   */
  @Input()
  public reverse = false;

  /**
   * Controls the height at which the element will start hiding. By default the value is twice the height of
   * the header
   */
  @Input()
  public scrollAt = 0;

  /**
   * Internal value for element hidden state
   */
  private elementIsHidden: Subject<boolean> = new ReplaySubject<boolean>(1);

  /**
   * Current view properties as observable
   */
  private currentViewProperties = new BehaviorSubject<HideableHeaderProperties>(this.getViewProperties());

  constructor(
    private readonly headerElement: ElementRef,
    private readonly render: Renderer2,
    @Inject(PLATFORM_ID) private platformId: string,
    private sanitizer: DomSanitizer,
    private readonly cd: ChangeDetectorRef
  ) {}

  /**
   * The CSS position to use
   */
  private _position = 'fixed';

  /**
   * Properties for the style position attribute
   */
  @HostBinding('style.position')
  @Input()
  /**
   * Get the position
   */
  get position(): string {
    return this._position;
  }
  /**
   * Set the position
   * @param position A CSS position string (e.g. `fixed`, `relative`)
   */
  set position(position: string) {
    this._position = position;
  }

  /**
   * Properties for the style top attribute
   */
  private _top = '0px';
  @HostBinding('style.top')
  @Input()
  /**
   * Get the top value
   */
  get top(): string {
    return this._top;
  }
  /**
   * Set the top value as a CSS size
   * @param top
   */
  set top(top: string) {
    this._top = top;
  }


  private _left = '0';
  @HostBinding('style.left')
  @Input()
  get left() {
    return this._left;
  }
  set left(left: string) {
    this._left = left;
  }

  private _transition = '1s linear';
  @Input()
  get transition() {
    return this._transition;
  }
  set transition(transition: string) {
    this._transition = transition
  }

  @HostBinding('style.transition')
  get hostElementTransform(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(this.transition);
  }

  /**
   * The ID of the container type, one of `window`, `document`, `body` or ID of an element
   */
  @Input()
  public container: ContainerType = 'window';

  /**
   * Observable value of the current {@link HideableHeaderProperties}
   */
  public get viewProperties(): Observable<HideableHeaderProperties> {
    return this.currentViewProperties.asObservable();
  }

  /**
   * Observable value of the current hidden state.
   */
  public get isHidden(): Observable<boolean> {
    return this.elementIsHidden.asObservable();
  }

  /**
   * Shows the host element
   * @param immediate
   */
  public show(immediate = false) {
    if (immediate) {
      this.setStyle('top', '0px');
      this.cd.checkNoChanges();
    } else {
      this.setStyle('transform', `translateY(0${this.units})`);
    }
    this.elementIsHidden.next(false);
  }

  /**
   * Hides the host element
   */
  public hide() {
    this.setStyle('transform', `translateY(-${this.getViewProperties().transitionHeight}${this.units})`);
    this.elementIsHidden.next(true);
  }

  /**
   * Gets a map of the current view properties
   */
  private getViewProperties(): HideableHeaderProperties {
    let scrollTop: any = '0px';

    if (this.container === 'window') {
      scrollTop = window.document.scrollingElement.scrollTop;
    } else if (this.container === 'document') {
      scrollTop = document.scrollingElement.scrollTop
    } else if (this.container === 'body') {
      scrollTop = document.body.scrollTop;
    } else {
       const el = document.getElementById(this.container);
       if (el) {
         scrollTop = el.scrollTop;
       }
    }
    console.log(scrollTop, this.headerElement)
    return {
      scrollTop,
      lastScrollTop: this.lastScrollTop,
      transitionHeight: this.height ||  this.headerElement && this.headerElement.nativeElement.clientHeight
    };
  }

  /**
   * Calculates if an element should be hidden
   */
  private hideElement = (viewProps: HideableHeaderProperties): boolean => {
    return viewProps.lastScrollTop > 0 && viewProps.lastScrollTop < viewProps.scrollTop && viewProps.scrollTop > this.scrollAt;
  };

  /**
   * Calculates if an element should be shown
   */
  private showElement = (viewProps: HideableHeaderProperties): boolean =>
    viewProps.lastScrollTop > viewProps.scrollTop && !(viewProps.scrollTop <= viewProps.transitionHeight);

  /**
   * Method called on scroll event
   */
  private doScroll(viewProps: HideableHeaderProperties) {
    console.log(viewProps);
    this.currentViewProperties.next(viewProps);
    if ((!this.reverse && this.hideElement(viewProps)) || (this.reverse && this.showElement(viewProps))) {
      this.hide();
    } else if ((!this.reverse && this.showElement(viewProps)) || (this.reverse && this.hideElement(viewProps))) {
      this.show();
    }
    this.lastScrollTop = viewProps.scrollTop;
  }

  /**
   * Wrapper to set the style
   */
  private setStyle(operation: string, value: string) {
    this.render.setStyle(this.headerElement.nativeElement, operation, value);
  }

  ngAfterContentInit(): void {
    if (!this.height && this.headerElement) {
      this.height = this.headerElement.nativeElement.clientHeight;
    }
    if (!this.scrollAt && this.height) {
      this.scrollAt = this.height + this.height;
    }

    let container: string | Element;
    if (this.container === 'window' || this.container === 'document' || this.container === 'body') {
      container = this.container
    } else {
      container = document.getElementById(this.container);
    }

    this.render.listen(container, 'scroll', (scrollEvent) => {
        if (!isPlatformBrowser(this.platformId) || this.disable) {
          return;
        }
        this.doScroll(this.getViewProperties());
    })
  }

  private scrollEventListener(event: MouseEvent) {
    if (!isPlatformBrowser(this.platformId) || this.disable) {
      return;
    }
    this.doScroll(this.getViewProperties());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disable && changes.disable.currentValue && typeof this.scrollListener === 'function') {
      this.show();
      return this.scrollListener();
    } else if (changes.disable && !changes.disable.currentValue) {
      let container: string | Element;
      if (this.container === 'window' || this.container === 'document' || this.container === 'body') {
        container = this.container
      } else {
        container = document.getElementById(this.container);
      }
      this.scrollListener = this.render.listen(container, 'click', this.scrollEventListener.bind(this))
    }


  }

  ngOnDestroy(): void {

  }

}
