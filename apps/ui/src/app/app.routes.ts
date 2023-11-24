import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@angular-start/home').then((c) => c.HomeComponent),
  },
];
