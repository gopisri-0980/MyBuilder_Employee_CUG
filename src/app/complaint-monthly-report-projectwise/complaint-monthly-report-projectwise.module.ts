import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplaintMonthlyReportProjectwiseComponent } from './complaint-monthly-report-projectwise.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: "", component: ComplaintMonthlyReportProjectwiseComponent },

];



@NgModule({
  declarations: [ComplaintMonthlyReportProjectwiseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ComplaintMonthlyReportProjectwiseModule { }
