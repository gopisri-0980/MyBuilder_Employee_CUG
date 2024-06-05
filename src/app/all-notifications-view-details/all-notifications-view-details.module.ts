import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllNotificationsViewDetailsComponent } from './all-notifications-view-details.component';
const routes: Routes = [
  { path: "", component: AllNotificationsViewDetailsComponent },

];
@NgModule({
  declarations: [
    AllNotificationsViewDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AllNotificationsViewDetailsModule { }
