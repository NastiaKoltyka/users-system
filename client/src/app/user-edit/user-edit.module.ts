import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  { path: '', component: UserEditComponent}]


@NgModule({
  declarations: [
    UserEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserEditModule { }
