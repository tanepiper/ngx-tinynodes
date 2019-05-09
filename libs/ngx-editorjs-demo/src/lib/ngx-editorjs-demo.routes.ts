import { Route } from '@angular/router';
import { EditorPageComponent } from './containers/editor-page/editor-page.component';
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
    path: 'ngx-editorjs-demo/pages/editor',
    component: EditorPageComponent
  },
  {
    path: 'ngx-editorjs-demo/pages/editor/:id',
    component: EditorPageComponent
  }
];
