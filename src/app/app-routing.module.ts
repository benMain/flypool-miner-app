import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './guards';
import { LayoutComponent } from './dashboard/layout/layout.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthenticationGuard],
    component: LayoutComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
