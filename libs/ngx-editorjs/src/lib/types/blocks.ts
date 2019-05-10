/**
 * Base block type for EditorJS
 */
export interface Block<T = any> {
  /**
   * The EditorJS block type
   */
  type: string;

  /**
   * The data interface for the block type
   */
  data: T;

  /**
   * Additional properties on the type
   */
  [key: string]: any;
}

/**
 * Available list styles, supports `ordered` and `unordered`.
 * A custom string can also be added
 */
export type ListStyle = 'ordered' | 'unordered' | string;

/**
 * Default data type for a list block
 */
export interface List<T = any> {
  /**
   * The list style
   */
  style: ListStyle;
  /**
   * List items of type T
   */
  items: T[];
}

/**
 * The default list block is provided by the EditorJS list plugin
 */
export interface ListBlock extends Block<List<string>> {
  /**
   * The EditorJS block type
   */
  type: 'list';
}

/**
 * Default data type for a paragraph block
 */
interface Paragraph {
  /**
   * The paragraph text
   */
  text: string;
}

/**
 * Interface for a paragraph block
 */
export interface ParagraphBlock extends Block<Paragraph> {
  /**
   * The EditorJS block type
   */
  type: 'paragraph';
}

/**
 * Default data type for a header block
 */
interface Header {
  /**
   * The header text
   */
  text: string;
  /**
   * The header level from 1-6
   */
  level: number;
}

/**
 * Interface for a header block
 */
export interface HeaderBlock extends Block<Header> {
  /**
   * The EditorJS block type
   */
  type: 'header';
}

/**
 * Default data type for a header block
 */
export interface Image {
  /**
   * The image URL
   */
  url: string;
  /**
   * Optional image caption
   */
  caption?: string;
  /**
   * Optional border property
   */
  withBorder?: boolean;

  /**
   * Optional background property
   */
  withBackground?: boolean;

  /**
   * Optional stretch property
   */
  stretched?: boolean;
}

/**
 * Interface for a image block
 */
export interface ImageBlock extends Block<Image> {
  /**
   * The EditorJS block type
   */
  type: 'image';
}

/**
 * Type of all the basic block type
 */
export type BlockTypes = ParagraphBlock | HeaderBlock | ImageBlock | ListBlock | Block;
