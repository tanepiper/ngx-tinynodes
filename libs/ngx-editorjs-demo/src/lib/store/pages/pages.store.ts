import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Page } from './pages.models';

export interface PagesState extends EntityState<Page> {}

@Injectable()
@StoreConfig({ name: 'pages' })
export class PagesStore extends EntityStore<PagesState, Page> {
  constructor() {
    super();
  }
}
