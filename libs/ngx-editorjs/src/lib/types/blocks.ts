/**
 * Base block type for EditorJS
 */
export interface Block<T = any> {
  type: string;
  data: T;
}

/**
 * Available list styles
 */
export type ListStyle = 'ordered' | 'unordered' | string;

/**
 * Interface for a list type
 */
export interface List<T = any> {
  style: ListStyle;
  items: T[];
}

/**
 * Interface for a basic list block
 */
export interface ListBlock extends Block<List<string>> {
  type: 'list';
}

/**
 * Interface for a paragraph type
 */
interface Paragraph {
  text: string;
}

/**
 * Interface for a paragraph block
 */
export interface ParagraphBlock extends Block<Paragraph> {
  type: 'paragraph';
}

/**
 * Header data type
 */
interface Header {
  text: string;
  level: number;
}

/**
 * Header blocks
 */
export interface HeaderBlock extends Block<Header> {
  type: 'header';
}

/**
 * Image data
 */
export interface Image {
  url: string;
  [key: string]: any;
}

/**
 * Image blocks
 */
export interface ImageBlock extends Block<Image> {
  type: 'image';
}

export type BlockTypes = ParagraphBlock | HeaderBlock | ImageBlock | Block | ListBlock;
