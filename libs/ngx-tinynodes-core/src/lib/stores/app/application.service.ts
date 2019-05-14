import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap, switchMapTo } from 'rxjs/operators';
import { ApplicationData, MenuGroup } from '../../types/app';
import { ApplicationQuery } from './application.query';
import { ApplicationStore } from './application.store';
import { DemoData } from './application.model';
import { Block } from '@tinynodes/ngx-editorjs/src';

@Injectable()
export class AppService {
  constructor(
    private readonly query: ApplicationQuery,
    private readonly store: ApplicationStore,
    private readonly http: HttpClient
  ) {
    this.loadData();
  }

  get hidden(): Observable<boolean> {
    return this.query.select('hidden');
  }

  public toggleSidebar() {
    this.store.update({ hidden: !this.store._value().hidden });
  }

  public getDemoData(demoName: string): Block[] {
    return this.query.select('demoData').pipe(
      filter(data => typeof data !== 'undefined'),
      map((demoData: DemoData[]) => {
        return demoData.find(demo => demo.name === demoName).data.blocks as any;
      })
    ) as any;
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

  private loadData() {
    this.http.get('/assets/app-data.json').subscribe((appData: ApplicationData) => {
      this.store.update(appData);
    });
  }
}
