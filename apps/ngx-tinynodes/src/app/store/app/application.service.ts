import { Injectable } from '@angular/core';
import { ApplicationQuery } from './application.query';
import { ApplicationStore } from './application.store';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApplicationData, MenuGroup } from '../../types/app';
import { switchMapTo, map, distinctUntilChanged, filter } from 'rxjs/operators';

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

  public getMenu(key: string): Observable<MenuGroup> {
    return this.query.select('menus').pipe(
      distinctUntilChanged(),
      filter(menus => menus !== undefined && menus.length > 0),
      map(menus => {
        return menus.find(menu => menu.key == key);
      })
    );
  }

  private loadMenu() {
    this.http.get('/assets/app-data.json').subscribe((appData: ApplicationData) => {
      this.store.update({ menus: appData.menus });
    });
  }
}
