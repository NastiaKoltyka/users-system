import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {MyPageComponent } from '../my-page/my-page/my-page.component';

const routes: Routes = [
  { path: '', component: MyPageComponent}]

@NgModule({
  declarations: [
    MyPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class MyPageModule { }
