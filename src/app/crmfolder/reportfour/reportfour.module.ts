import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportfourComponent } from './reportfour.component';
import { ChartsModule } from 'ng2-charts';
const routes: Routes = [
  { path: "", component: ReportfourComponent },

];
@NgModule({
  declarations: [
    ReportfourComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
  ]
})
export class ReportfourModule { }
