import { ID } from '@datorama/akita';
import { Block } from '@tinynodes/ngx-editorjs';

export interface Tag {
  key: string;
}

export interface PageBlock extends Block {
  id: ID;
}

export interface Page {
  id: ID;
  pageTitle: string;
  pageTags: Tag[];
  blocks: PageBlock[];
}
