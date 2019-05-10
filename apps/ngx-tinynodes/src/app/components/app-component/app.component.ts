import { Component, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Subject } from 'rxjs';
import { ApplicationService } from '../../store/app/application.service';
import { takeUntil } from 'rxjs/operators';

/**
 * The main application component that provides the root container
 */
@Component({
  selector: 'tinynodes-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * The page title
   */
  @Input()
  public pageTitle = 'Tinynodes Angular Demos';

  @ViewChild(MatSidenav) sidenav: MatSidenav;

  private readonly onDestroy$ = new Subject<boolean>();

  constructor(private readonly app: ApplicationService) {}

  ngOnInit() {
    this.app.hidden.pipe(takeUntil(this.onDestroy$)).subscribe(value => {
      value ? this.sidenav.close() : this.sidenav.open();
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
