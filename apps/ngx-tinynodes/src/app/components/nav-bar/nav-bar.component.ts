import { Component, Input } from '@angular/core';
import { AppService } from '../../store/app/application.service';

@Component({
  selector: 'tinynodes-nav-bar',
  templateUrl: 'nav-bar.component.html',
  styleUrls: ['nav-bar.component.scss']
})
export class NavBarComponent {
  @Input()
  title = 'Navbar Component';

  constructor(private readonly app: AppService) {}

  public toggleSidebar() {
    this.app.toggleSidebar();
  }
}
