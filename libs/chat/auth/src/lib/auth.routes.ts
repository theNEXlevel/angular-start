import { Route } from '@angular/router';

export const AUTH_ROUTES: Route[] = [
  { path: 'login', loadComponent: () => import('./login').then((m) => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./register').then((m) => m.RegisterComponent) },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
