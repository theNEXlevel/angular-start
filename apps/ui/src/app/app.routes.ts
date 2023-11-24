import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@as/home').then((c) => c.HomeComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
