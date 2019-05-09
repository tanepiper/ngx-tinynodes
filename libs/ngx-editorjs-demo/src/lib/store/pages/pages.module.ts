import { NgModule } from '@angular/core';
import { PagesQuery } from './pages.query';
import { PagesService } from './pages.service';
import { PagesStore } from './pages.store';

@NgModule({
  providers: [PagesStore, PagesQuery, PagesService]
})
export class PageStoreModule {}
