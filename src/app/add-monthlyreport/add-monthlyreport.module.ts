import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMonthlyreportComponent } from './add-monthlyreport.component';
const routes: Routes = [
  { path: "", component: AddMonthlyreportComponent },

];
@NgModule({
  declarations: [
    AddMonthlyreportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AddMonthlyreportModule { }
