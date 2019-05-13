import { RouterLink } from '@angular/router';

export interface MenuItem {
  label: string;
  link?: RouterLink;
  children: MenuItem[];
}

export interface ApplicationData {
  menuItems: MenuItem[];
}

export interface ApplicationState {
  hidden: boolean;
  menu: MenuItem[];
}
