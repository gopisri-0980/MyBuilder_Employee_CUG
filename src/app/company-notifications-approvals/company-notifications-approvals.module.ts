import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyNotificationsApprovalsComponent } from './company-notifications-approvals.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
const routes: Routes = [
  { path: "", component: CompanyNotificationsApprovalsComponent },

];
@NgModule({
  declarations: [
    CompanyNotificationsApprovalsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ]
})
export class CompanyNotificationsApprovalsModule { }
