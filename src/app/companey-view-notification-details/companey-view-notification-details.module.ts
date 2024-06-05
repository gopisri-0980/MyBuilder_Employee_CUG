import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaneyViewNotificationDetailsComponent } from './companey-view-notification-details.component';


import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: CompaneyViewNotificationDetailsComponent },

];


@NgModule({
  declarations: [CompaneyViewNotificationDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CompaneyViewNotificationDetailsModule { }
