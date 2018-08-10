import { Routes } from '@angular/router'
import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component'
import { EnterprisesComponent } from './pages/enterprises/enterprises.component'
import { FarmerRegistrationComponent } from './pages/farmer-registration/farmer-registration.component'
import { FarmersListPageComponent } from './pages/farmers-list-page/farmers-list-page.component'
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
    path: 'farmers',
    component: FarmersListPageComponent,
  },
  {
    path: 'farmers/register',
    component: FarmerRegistrationComponent,
  },
  {
    path: 'enterprises',
    component: EnterprisesComponent,
  },
  {
    path: 'pages-signin',
    component: SigninPageComponent,
  },
]
