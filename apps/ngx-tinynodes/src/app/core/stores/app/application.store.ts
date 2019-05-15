import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ApplicationState } from './application.model';

/**
 * Store for the Application state data
 */
@Injectable()
@StoreConfig({ name: 'application' })
export class ApplicationStore extends Store<ApplicationState> {
  /**
   * Provide an empty state for the application
   */
  constructor() {
    super({
      hidden: false,
      menus: [],
      demoData: []
    });
  }
}
