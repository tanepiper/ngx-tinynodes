import { AfterContentInit, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { AppService } from '@tinynodes/ngx-tinynodes-core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

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

  constructor(private readonly app: AppService) {
    this.app.hidden.pipe(takeUntil(this.onDestroy$)).subscribe(hidden => {
      this.sidebarHidden$.next(hidden);
    });
  }

  public get sidebarHidden(): Observable<boolean> {
    return this.sidebarHidden$.asObservable();
  }

  public toggleSidebar() {
    this.app.toggleSidebar();
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
