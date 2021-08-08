import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'login', loadChildren: () => import('../login/login.module').then(m => m.LoginModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'users', loadChildren: () => import('../users/users.module').then(m => m.UsersModule) },
  { path: 'my-page', loadChildren: () => import('../my-page/my-page.module').then(m => m.MyPageModule) },
  {
    path: 'users/:id', loadChildren: () => import('../user-details/user-details.module').then(m => m.UserDetailsModule), canActivate: [AuthGuard], data: {
      role: 'can_view_details'
    }
  },
  {
    path: 'user-edit/:id', loadChildren: () => import('../user-edit/user-edit.module').then(m => m.UserEditModule), canActivate: [AuthGuard],
    data: {
      role: 'can_edit_users'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
