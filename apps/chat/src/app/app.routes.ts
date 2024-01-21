import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'home',
    loadComponent: () => import('@as/chat/home').then((m) => m.ChatHomeComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
