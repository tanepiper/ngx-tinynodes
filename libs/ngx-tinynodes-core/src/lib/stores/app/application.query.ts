import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ApplicationState } from './application.model';
import { ApplicationStore } from './application.store';

/**
 * The {Query} handler for the Application state data
 */
@Injectable()
export class ApplicationQuery extends Query<ApplicationState> {
  /**
   * Provide the store for the class instance
   * @param store Store to be provided
   */
  constructor(protected store: ApplicationStore) {
    super(store);
  }
}
