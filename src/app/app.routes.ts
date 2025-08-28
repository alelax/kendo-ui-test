import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'grid',
    loadChildren: () => import('./features/grid/grid.routes').then(m => m.gridRoutes)
  },
  {
    path: 'calendar',
    loadComponent: () => import('./features/calendar/calendar.component')
  }
];
