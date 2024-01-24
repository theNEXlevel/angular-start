import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: 'auth', loadChildren: () => import('@as/chat/auth').then((m) => m.AUTH_ROUTES) },
  { path: 'home', loadComponent: () => import('@as/chat/home').then((m) => m.ChatHomeComponent) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
