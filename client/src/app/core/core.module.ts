import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

import { LoginComponent } from '../components/login/login.component';
import { UsersComponent } from '../components/users/users.component';
import { MyPageComponent } from '../components/my-page/my-page.component';
import { UserDetailsComponent } from '../components/user-details/user-details.component';


import { CoreRoutingModule } from './core-routing.module';


@NgModule({
  declarations: [
    LoginComponent,
    UsersComponent,
    MyPageComponent,
    UserDetailsComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports:[
    RouterModule
  ]
})
export class CoreModule { }
