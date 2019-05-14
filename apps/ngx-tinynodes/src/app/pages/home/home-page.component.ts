import { Component } from '@angular/core';
import { AppService } from '@tinynodes/ngx-tinynodes-core/src';

@Component({
  selector: 'tinynodes-home-page',
  templateUrl: 'home-page.component.html',
  styleUrls: ['home-page.component.scss']
})
export class HomePageComponent {
  constructor(private readonly app: AppService) {}

  public get menu() {
    return this.app.getMenu('main-links');
  }
}
