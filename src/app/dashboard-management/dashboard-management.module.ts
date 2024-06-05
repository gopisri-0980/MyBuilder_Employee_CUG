import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardManagementComponent } from './dashboard-management.component';
const routes: Routes = [
  { path: "", component: DashboardManagementComponent },

];
@NgModule({
  declarations: [
    DashboardManagementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashboardManagementModule { }
