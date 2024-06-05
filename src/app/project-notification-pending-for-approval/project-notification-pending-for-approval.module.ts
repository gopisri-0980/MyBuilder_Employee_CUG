import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectNotificationPendingForApprovalComponent } from './project-notification-pending-for-approval.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
const routes: Routes = [
  { path: "", component: ProjectNotificationPendingForApprovalComponent },

];

@NgModule({
  declarations: [ProjectNotificationPendingForApprovalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ]
})
export class ProjectNotificationPendingForApprovalModule { }
