import { NgModule } from '@angular/core';
import { PagesQuery } from './pages.query';
import { PagesService } from './pages.service';
import { PagesStore } from './pages.store';

/**
 *
 * **WARNING**: This module is currently in development
 *
 * Internal page store module, this will allow the `ngx-editorjs-demo` to support the creation of multiple pages
 */
@NgModule({
  providers: [PagesStore, PagesQuery, PagesService]
})
export class PageStoreModule {}
