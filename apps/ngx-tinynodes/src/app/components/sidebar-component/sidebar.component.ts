import { Component, OnInit, ViewChild, OnDestroy, AfterContentInit } from '@angular/core';
import { AppService } from '../../store/app/application.service';
import { MatSidenav } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tinynodes-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private readonly app: AppService) {}

  public get menu() {
    return this.app.getMenu();
  }
}
