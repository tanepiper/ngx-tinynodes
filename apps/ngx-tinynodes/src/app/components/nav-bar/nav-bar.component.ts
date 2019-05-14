import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../store/app/application.service';

@Component({
  selector: 'tinynodes-nav-bar',
  templateUrl: 'nav-bar.component.html',
  styleUrls: ['nav-bar.component.scss']
})
export class NavBarComponent {
  @Input()
  title = 'Navbar Component';

  @Output()
  toggleSidebar = new EventEmitter<void>();

  constructor(private readonly app: AppService) {}

  // public toggleSidebar() {
  //   this.app.toggleSidebar();
  // }
}
