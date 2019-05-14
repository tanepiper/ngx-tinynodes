import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuGroup } from '@tinynodes/ngx-tinynodes-core/src';

/**
 * Internal NavBar component for the Tinynodes application, provides
 * control over the sidebar toggle and displays the main menu
 */
@Component({
  selector: 'tinynodes-nav-bar',
  templateUrl: 'nav-bar.component.html',
  styleUrls: ['nav-bar.component.scss']
})
export class NavBarComponent {
  /**
   * Set the title of the component
   */
  @Input()
  title = 'Navbar Component';

  @Input()
  menu: MenuGroup;

  /**
   * Get an event when the sidebar toggle has been pressed
   */
  @Output()
  toggleSidebar = new EventEmitter<void>();
}
