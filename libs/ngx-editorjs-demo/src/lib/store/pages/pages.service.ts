import { Injectable } from '@angular/core';
import { arrayAdd, arrayRemove, guid, ID } from '@datorama/akita';
import { Block } from '@tinynodes/ngx-editorjs';
import { Observable } from 'rxjs';
import { Page, PageBlock } from './pages.models';
import { PagesQuery } from './pages.query';
import { PagesStore } from './pages.store';

/**
 * This page service provides a way to save and render pages
 * via the store
 */
@Injectable()
export class PagesService {
  private pages$: Observable<Page[]>;

  constructor(public readonly query: PagesQuery, public readonly store: PagesStore) {
    this.pages$ = this.query.selectAll();
  }

  /**
   * Get an observable of all the pages in the store
   */
  get pages(): Observable<Page[]> {
    return this.pages$;
  }

  /**
   * Add a page to the store
   * @param page An optional page to be added
   */
  add(page?: Page) {
    const newPage: Page = {
      id: guid(),
      pageTitle: 'New Page',
      pageTags: [],
      blocks: [],
      ...page
    };
    console.log(newPage);
    this.store.add(newPage);
  }

  /**
   * Updates or creates a page
   * @param page The page to be updated, if not available it will be created
   */
  upsert(page: Page) {
    if (!page.id) page.id = guid();
    this.store.upsert(page.id, page);
  }

  /**
   * Removes a page
   * @param pageId The ID of the page to be removed
   */
  delete(pageId: ID) {
    this.store.remove(pageId);
  }

  /**
   * Get a page from the store
   * @param pageId The ID of the page to get
   */
  getPage(pageId: ID) {
    return this.query.selectEntity(pageId);
  }

  /**
   *
   * @param pageId The Page ID
   * @param blocks The blocks to store
   */
  setBlocks(pageId: ID | any, blocks: PageBlock[]) {
    this.store.update(pageId, { blocks });
  }

  addBlock(pageId: ID, block: Block) {
    this.store.update(pageId, (entity: Page) => ({
      blocks: arrayAdd(entity.blocks, { id: guid(), ...block })
    }));
  }

  removeBlock(pageId: ID, block: PageBlock) {
    this.store.update(pageId, (entity: Page) => ({
      blocks: arrayRemove(entity.blocks, block.id)
    }));
  }
}
