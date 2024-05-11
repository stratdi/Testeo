import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () => import('../test-list/test-list.page').then((m) => m.TestListPage),
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
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];