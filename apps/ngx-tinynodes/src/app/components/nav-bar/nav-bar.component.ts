import { Component, Input } from '@angular/core';
import { ApplicationService } from '../../store/app/application.service';

@Component({
  selector: 'ngx-nav-bar',
  templateUrl: 'nav-bar.component.html',
  styleUrls: ['nav-bar.component.scss']
})
export class NavBarComponent {
  @Input()
  title = 'Navbar Component';

  constructor(private readonly app: ApplicationService) {}

  public toggleSidebar() {
    this.app.toggleSidebar();
  }
}
