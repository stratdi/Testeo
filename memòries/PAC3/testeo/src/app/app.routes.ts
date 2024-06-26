import { Routes } from '@angular/router';
import { autoLoginGuard } from './guards/auto-login.guard';
import { introGuard } from './guards/intro.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
    canMatch: [introGuard, autoLoginGuard] // Check if we should show the introduction or forward to inside
  },
  {
    path: 'intro',
    loadComponent: () => import('./pages/intro/intro.page').then((m) => m.IntroPage)
  },
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.routes').then((m) => m.routes),
    canMatch: [authGuard]
  },
  {
    path: 'question-form',
    loadComponent: () => import('./pages/question-create/question-create.page').then(m => m.QuestionFormPage)
  },
  {
    path: 'question-edit',
    loadComponent: () => import('./pages/question-edit/question-edit.page').then( m => m.QuestionEditPage)
  },
  // {
  //   path: 'tests/:id',
  //   loadComponent: () => import('./pages/test-detail/test-detail.page').then(m => m.TestDetailPage)
  // },
];