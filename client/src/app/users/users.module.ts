import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import {UsersComponent } from '../users/users/users.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: UsersComponent}]


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})
export class UsersModule { }
