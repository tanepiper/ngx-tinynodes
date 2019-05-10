import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { ApplicationState } from './application.model';

@Injectable()
@StoreConfig({ name: 'application' })
export class ApplicationStore extends Store<ApplicationState> {
  constructor() {
    super({
      hidden: false
    });
  }

  toggleMenu() {
    this.update({ hidden: !this._value().hidden });
  }
}
