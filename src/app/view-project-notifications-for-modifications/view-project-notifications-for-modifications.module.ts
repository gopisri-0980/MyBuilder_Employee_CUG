import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProjectNotificationsForModificationsComponent } from './view-project-notifications-for-modifications.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: ViewProjectNotificationsForModificationsComponent },

];

@NgModule({
  declarations: [ViewProjectNotificationsForModificationsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ViewProjectNotificationsForModificationsModule { }
