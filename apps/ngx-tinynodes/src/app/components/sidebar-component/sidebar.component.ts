import { Component, Input } from '@angular/core';
import { MenuGroup } from '@tinynodes/ngx-tinynodes-core';

@Component({
  selector: 'tinynodes-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss']
})
export class SidebarComponent {
  @Input()
  projectsMenu: MenuGroup;

  @Input()
  openSourceMenu: MenuGroup;
}
