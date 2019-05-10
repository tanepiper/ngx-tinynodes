import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ApplicationService } from '../../store/app/application.service';
import { MatSidenav } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
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
