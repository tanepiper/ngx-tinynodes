import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Page } from './pages.models';
import { PagesState, PagesStore } from './pages.store';

@Injectable()
export class PagesQuery extends QueryEntity<PagesState, Page> {
  constructor(protected store: PagesStore) {
    super(store);
  }
}
