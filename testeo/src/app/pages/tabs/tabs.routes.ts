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
        path: 'list/:id/edit',
        loadComponent: () => import('../test-edit/test-edit.page').then(m => m.TestFormPage)
      },
      {
        path: 'list/:id/questions',
        loadComponent: () => import('../question-create/question-create.page').then(m => m.QuestionFormPage)
      },
      {
        path: 'list/:id/questions/:questionId/edit',
        loadComponent: () => import('../question-create/question-create.page').then(m => m.QuestionFormPage)
      },
      {
        path: 'create',
        loadComponent: () => import('../test-create/test-create.page').then((m) => m.TestCreatePage),
      },
      {
        path: 'create/:id/questions',
        loadComponent: () => import('../question-create/question-create.page').then(m => m.QuestionFormPage)
      },
      {
        path: 'favorites',
        loadComponent: () => import('../test-favorites/test-favorites.page').then((m) => m.TestFavoritesPage),
      },
      {
        path: 'favorites/:id/details',
        loadComponent: () => import('../test-detail/test-detail.page').then(m => m.TestDetailPage)
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