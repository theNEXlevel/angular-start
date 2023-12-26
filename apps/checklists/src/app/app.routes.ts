import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'home',
    loadComponent: () => import('@as/checklist/home').then((m) => m.HomeComponent),
  },
  {
    path: 'checklist/:id',
    loadComponent: () => import('@as/checklist').then((m) => m.ChecklistComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
