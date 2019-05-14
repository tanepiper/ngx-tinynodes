import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomePageComponent } from './pages/home/home-page.component';

/**
 * The main application routes
 */
export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
