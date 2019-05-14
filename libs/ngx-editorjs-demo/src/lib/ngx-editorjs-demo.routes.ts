import { Route } from '@angular/router';
import { PageContainerComponent } from './containers/page-container/page-container.component';

export const ngxEditorjsDemoRoutes: Route[] = [
  {
    path: 'ngx-editorjs-demo',
    redirectTo: 'ngx-editorjs-demo/pages',
    pathMatch: 'full'
  },
  {
    path: 'ngx-editorjs-demo/pages',
    component: PageContainerComponent
  },

  {
    path: 'ngx-editorjs-demo/pages/:id',
    component: PageContainerComponent
  }
];
