import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DailyReportsComponent } from './daily-reports.component';
const routes: Routes = [
  { path: "", component: DailyReportsComponent },

];
@NgModule({
  declarations: [
    DailyReportsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DailyReportsModule { }
