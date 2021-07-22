import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {UserDetailsComponent } from '../user-details/user-details/user-details.component';

const routes: Routes = [
  { path: '', component: UserDetailsComponent}]

@NgModule({
  declarations: [
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class UserDetailsModule { }
