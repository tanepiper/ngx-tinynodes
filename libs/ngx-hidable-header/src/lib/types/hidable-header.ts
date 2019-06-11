/**
 * View Properties of the directive
 */
export interface HideableHeaderProperties {
  /**
   * Current scroll top value
   */
  scrollTop: number;
  /**
   * Last scroll top value
   */
  lastScrollTop: number;
  /**
   * The height to transition the header animation by
   */
  transitionHeight: number;
}
