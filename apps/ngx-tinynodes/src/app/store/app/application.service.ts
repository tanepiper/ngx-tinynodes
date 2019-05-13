import { Injectable } from '@angular/core';
import { ApplicationData } from './application.model';
import { ApplicationQuery } from './application.query';
import { ApplicationStore } from './application.store';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppService {
  constructor(
    private readonly query: ApplicationQuery,
    private readonly store: ApplicationStore,
    private readonly http: HttpClient
  ) {
    this.loadMenu();
  }

  get hidden(): Observable<boolean> {
    return this.query.select('hidden');
  }

  public toggleSidebar() {
    this.store.update({ hidden: !this.store._value().hidden });
  }

  public getMenu() {
    return this.query.getValue().menu;
  }

  private loadMenu() {
    this.http.get('/assets/app-data.json').subscribe((appData: ApplicationData) => {
      this.store.update({ menu: appData.menuItems });
    });
  }
}
