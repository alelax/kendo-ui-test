import { Routes } from '@angular/router';
import GridComponent from './grid.component';

export const gridRoutes: Routes = [
  {
    path: '',
    component: GridComponent,
    children: [
      {
        path: '',
        redirectTo: 'base-grid',
        pathMatch: 'full'
      },
      {
        path: 'base-grid',
        loadComponent: () => import('./example-grids/base-grid/base-grid.component')
      },
      {
        path: 'grid-with-grouping',
        loadComponent: () => import('./example-grids/grid-with-grouping/grid-with-grouping.component')
      },
      {
        path: 'grid-column-operations',
        loadComponent: () => import('./example-grids/grid-column-operations/grid-column-operations.component')
      },
      {
        path: 'grid-multi-view-state',
        loadComponent: () => import('./example-grids/grid-multi-view-state/grid-multi-view-state.component')
      },
      {
        path: 'master-detail-grid',
        loadComponent: () => import('./example-grids/master-detail-grid/master-detail-grid.component')
      }
    ]
  }
];
