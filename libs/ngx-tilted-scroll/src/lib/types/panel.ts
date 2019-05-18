import { ViewportScrollPosition } from '@angular/cdk/scrolling';

/**
 * A generic panel interface that provides a way to render panels inside the container.
 * That have an ID, order and optional class properties, and a data property that
 * is for the panel type
 */
export interface Panel<T = any> {
  /**
   * Unique ID of the panel
   */
  id: string;

  /**
   * String name of the panel type (e.g. 'default')
   */
  type: string;
  /**
   * Order of the panel item from 0
   */
  order?: number;

  /**
   * CSS classes for the container
   */
  class?: string;

  /**
   * Data of <T> for the container
   */
  data: T;
}

/**
 * Data type for the default data panel
 */
export interface DefaultPanelData {
  /**
   * The optional title to display inside the panel
   */
  title?: string;

  /**
   * The optional image to use as a background
   */
  imageUrl?: string;

  /**
   * The optional content to display inside the panel
   */
  content?: string;
}

/**
 * The interface for the default panel type
 */
export interface DefaultPanel extends Panel<DefaultPanelData> {
  /**
   * Default container type
   */
  type: 'default';

  /**
   * Default container class
   */
  class: 'default-container';
}

export interface ScrollEvent {
  scrollTop: number;
  viewportSize: Readonly<{
    width: number;
    height: number;
  }>;
  viewportRect: ClientRect;
  viewportScrollPosition: ViewportScrollPosition;
}
