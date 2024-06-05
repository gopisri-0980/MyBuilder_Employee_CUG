import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApprovedcustomerComponent } from './approvedcustomer.component';
const routes: Routes = [
  { path: "", component: ApprovedcustomerComponent },

];
@NgModule({
  declarations: [
    ApprovedcustomerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ApprovedcustomerModule { }
