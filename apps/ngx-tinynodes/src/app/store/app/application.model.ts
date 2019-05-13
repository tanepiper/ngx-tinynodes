import { RouterLink } from '@angular/router';

export interface MenuItem {
  label: string;
  link: RouterLink;
}

export interface ApplicationState {
  hidden: boolean;
  menu: MenuItem[];
}
