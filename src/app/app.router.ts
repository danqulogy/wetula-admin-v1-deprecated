import { Routes } from '@angular/router'
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component'
import { SigninPageComponent } from './pages/signin/signin-page.component'

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/pages-signin',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
  },
  {
    path: 'pages-signin',
    component: SigninPageComponent,
  },
]
