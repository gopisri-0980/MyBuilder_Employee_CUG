import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableTwoProjectWiseTktReportComponent } from './table-two-project-wise-tkt-report.component';
const routes: Routes = [
  { path: "", component: TableTwoProjectWiseTktReportComponent },

];
@NgModule({
  declarations: [
    TableTwoProjectWiseTktReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TableTwoProjectWiseTktReportModule { }
