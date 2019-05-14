import { Component, Input, ViewChild, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { AppService } from '../../store/app/application.service';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

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
}
