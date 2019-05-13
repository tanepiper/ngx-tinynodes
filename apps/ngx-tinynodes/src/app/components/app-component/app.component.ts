import { Component, Input, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Subject } from 'rxjs';
import { AppService } from '../../store/app/application.service';
import { takeUntil } from 'rxjs/operators';

/**
 * The main application component that provides the root container
 */
@Component({
  selector: 'tinynodes-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
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

  constructor(private readonly app: AppService) {}

  /**
   * Component initialized
   */
  ngOnInit() {
    this.app.hidden.pipe(takeUntil(this.onDestroy$)).subscribe(value => {
      value ? this.sidenav.close() : this.sidenav.open();
    });
  }

  /**
   * Component destroyed
   */
  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
