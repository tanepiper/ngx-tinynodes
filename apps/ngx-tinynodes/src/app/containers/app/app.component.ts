import { AfterContentInit, Component, Input, OnDestroy, ViewChild, Renderer2 } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { AppService } from '@tinynodes/ngx-tinynodes-core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { MediaMatcher } from '@angular/cdk/layout';

/**
 * The main application component that provides the root container
 */
@Component({
  selector: 'tinynodes-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppContainerComponent implements AfterContentInit, OnDestroy {
  /**
   * The page title
   */
  @Input()
  public pageTitle = 'Tinynodes Angular Demos';

  /**
   * The Material sidebar
   */
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  /**
   * When the component is destroyed
   */
  private readonly onDestroy$ = new Subject<boolean>();

  /**
   * Stores the current sidebar state
   */
  private readonly sidebarHidden$ = new BehaviorSubject<boolean>(false);

  /**
   * If it's a mobile view, hide the menu
   */
  private mobileView: MediaQueryList;

  constructor(
    private readonly app: AppService,
    private readonly matcher: MediaMatcher,
    private readonly render: Renderer2
  ) {
    this.mobileView = this.matcher.matchMedia('(max-width: 768px)');
    this.mobileView.addListener(this.matchView.bind(this));

    this.app.hidden.pipe(takeUntil(this.onDestroy$)).subscribe(hidden => {
      this.sidebarHidden$.next(hidden);
    });
  }

  /**
   * Sidebar State
   */
  public get sidebarHidden(): Observable<boolean> {
    return this.sidebarHidden$.asObservable();
  }

  /**
   * View matcher for mobile
   * @param event
   */
  private matchView(event: any) {
    this.toggleSidebar(!event.matches);
  }

  /**
   * Toggle sidebar
   * @param value
   */
  public toggleSidebar(value?: boolean) {
    this.app.toggleSidebar(value);
  }

  /**
   * Component initialized
   */
  ngAfterContentInit() {
    this.sidebarHidden$
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.onDestroy$)
      )
      .subscribe(hidden => (hidden ? this.sidenav.close() : this.sidenav.open()));
  }

  /**
   * Component destroyed
   */
  ngOnDestroy() {
    this.mobileView.removeListener(this.matchView);
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  /**
   * Get the application main menu
   */
  public get mainMenu() {
    return this.app.getMenu('main-links');
  }

  /**
   * Get the projects menu
   */
  public get projectsMenu() {
    return this.app.getMenu('tinynode-projects');
  }

  /**
   * Get the open source menu
   */
  public get openSourceMenu() {
    return this.app.getMenu('other-projects');
  }
}
