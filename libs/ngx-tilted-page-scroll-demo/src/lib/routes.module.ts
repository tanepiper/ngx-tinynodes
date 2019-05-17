import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { PageContainerComponent } from '../containers/page-container/page-container.component';

const routes: Route[] = [
  {
    path: 'ngx-tilted-page-scroll',
    redirectTo: 'ngx-tilted-page-scroll/page',
    pathMatch: 'full'
  },
  {
    path: 'ngx-tilted-page-scroll/page',
    component: PageContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgxTiltedPageScrollDemoRoutesModule {}
