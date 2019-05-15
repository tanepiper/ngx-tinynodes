import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { ApplicationData, MenuGroup } from '../../types/app';
import { ApplicationStateKeys, DemoData } from './application.model';
import { ApplicationQuery } from './application.query';
import { ApplicationStore } from './application.store';

/**
 * The main application service, this loads the initial data and then provides
 * it to the store, from here the main state can be updated and queried.
 */
@Injectable()
export class AppService {
  /**
   * Sets up the providers for service methods
   * @param query The application query provider
   * @param store The application store provider
   * @param http  The HTTP client provider
   */
  constructor(
    private readonly query: ApplicationQuery,
    private readonly store: ApplicationStore,
    private readonly http: HttpClient
  ) {
    // Load the application data
    this.http.get('/assets/app-data.json').subscribe((appData: ApplicationData) => this.store.update(appData));
  }

  /**
   * Returns if the side menu hidden state is set
   */
  get hidden(): Observable<boolean> {
    return this.query.select(ApplicationStateKeys.Hidden);
  }

  /**
   * Toggles the sidebar state
   */
  public toggleSidebar() {
    this.store.update({ [ApplicationStateKeys.Hidden]: !this.store._value()[ApplicationStateKeys.Hidden] });
  }

  /**
   * Returns the demo data for a specific demo <T>
   * @param demoName The name of the demo data to load
   */
  public getDemoData<T>(demoName: string): Observable<T> {
    return this.query.select(ApplicationStateKeys.DemoData).pipe(
      filter(data => typeof data !== 'undefined'),
      map((demoData: DemoData[]) => {
        return demoData.find(demo => demo.name === demoName).data;
      })
    ) as Observable<T>;
  }

  /**
   * Gets a {MenuGroup} from the men data
   * @param key The key of the menu to load
   */
  public getMenu<T>(key: string): Observable<MenuGroup<T>> {
    return this.query.select('menus').pipe(
      distinctUntilChanged(),
      filter(menus => menus !== undefined && menus.length > 0),
      map(menus => {
        return menus.find(menu => menu.key == key);
      })
    ) as Observable<MenuGroup<T>>;
  }
}
