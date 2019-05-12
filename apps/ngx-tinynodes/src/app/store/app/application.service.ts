import { Injectable } from '@angular/core';
import { ApplicationQuery } from './application.query';
import { ApplicationStore } from './application.store';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly query: ApplicationQuery, private readonly store: ApplicationStore) {}

  get hidden(): Observable<boolean> {
    return this.query.select('hidden');
  }

  public toggleSidebar() {
    this.store.update({ hidden: !this.store._value().hidden });
  }
}
