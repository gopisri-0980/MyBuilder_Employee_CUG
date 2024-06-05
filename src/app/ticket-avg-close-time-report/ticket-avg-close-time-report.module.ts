import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketAvgCloseTimeReportComponent } from './ticket-avg-close-time-report.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
const routes: Routes = [
  { path: "", component: TicketAvgCloseTimeReportComponent },

];

@NgModule({
  declarations: [TicketAvgCloseTimeReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
  ]
})
export class TicketAvgCloseTimeReportModule { }
