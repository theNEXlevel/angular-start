import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@as/home').then((c) => c.HomeComponent),
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('@as/detail').then((c) => c.DetailComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
