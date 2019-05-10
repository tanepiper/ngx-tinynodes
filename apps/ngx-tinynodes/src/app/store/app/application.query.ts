import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ApplicationState } from './application.model';
import { ApplicationStore } from './application.store';

@Injectable()
export class ApplicationQuery extends Query<ApplicationState> {
  constructor(protected store: ApplicationStore) {
    super(store);
  }
}
