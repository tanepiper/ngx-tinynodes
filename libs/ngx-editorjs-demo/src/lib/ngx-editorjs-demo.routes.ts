import { Route } from '@angular/router';
import { PageContainerComponent } from './containers/page-container/page-container.component';
import { FormContainerComponent } from './containers/form-container/form-container.component';
import { NgxEditorJSDemoHomeComponent } from './containers/home-container/home-container.component';

export const ngxEditorjsDemoRoutes: Route[] = [
  {
    path: 'ngx-editorjs-demo',
    component: NgxEditorJSDemoHomeComponent
  },
  {
    path: 'ngx-editorjs-demo/angular-component',
    component: PageContainerComponent
  },
  {
    path: 'ngx-editorjs-demo/angular-form',
    component: FormContainerComponent
  }
];
