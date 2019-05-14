import { RouterLink } from '@angular/router';

/**
 * A menu item in the Tinynodes app
 */
export interface MenuItem {
  /**
   * The display label for the app
   */
  label: string;
  /**
   * Optional icon for the menu item
   */
  icon?: string;
  /**
   * Description of the item, used for title, aria, etc
   */
  description?: string;
  /**
   * The {RouterLink} for the menu item or a string url
   */
  link?: RouterLink | string;

  /**
   * Any children to render in the menu
   */
  children?: MenuItem[];
}

/**
 * A menu group describes a set of menu items with a key and optional title
 */
export interface MenuGroup {
  /**
   * The key of the menu (e.g. `sidebar`, `topnav`, etc)
   */
  key: string;
  /**
   * Optional title to render in the menu
   */
  title?: string;

  /**
   * The menu items, can contain one or more items with children
   */
  items: MenuItem[];
}

/**
 * The aggregate application interface
 */
export interface ApplicationData {
  /**
   * If the sidebar menu is hidden
   */
  hidden: boolean;

  /**
   * An list of menu groups available in the apps
   */
  menus: MenuGroup[];
}
