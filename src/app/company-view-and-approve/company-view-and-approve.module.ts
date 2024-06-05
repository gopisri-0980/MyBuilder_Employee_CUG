import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompanyViewAndApproveComponent } from './company-view-and-approve.component';
const routes: Routes = [
  { path: "", component: CompanyViewAndApproveComponent },

];
@NgModule({
  declarations: [
    CompanyViewAndApproveComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    NgbModule,
  ]
})
export class CompanyViewAndApproveModule { }
