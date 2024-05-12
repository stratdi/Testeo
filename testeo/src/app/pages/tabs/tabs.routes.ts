import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tests',
    component: TabsPage,
    children: [
      {
        path: 'list',
        loadComponent: () => import('../test-list/test-list.page').then((m) => m.TestListPage),
      },
      {
        path: 'list/:id/details',
        loadComponent: () => import('../test-detail/test-detail.page').then(m => m.TestDetailPage)
      },
      {
        path: 'tab2',
        loadComponent: () => import('../test-create/test-create.page').then((m) => m.TestCreatePage),
      },
      {
        path: 'tab3',
        loadComponent: () => import('../test-favorites/test-favorites.page').then((m) => m.TestFavoritesPage),
      },
      {
        path: 'tab4',
        loadComponent: () => import('../user-profile/user-profile.page').then((m) => m.UserProfilePage),
      },
      {
        path: '',
        redirectTo: '/tests/list',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tests/tab1',
    pathMatch: 'full',
  },
];