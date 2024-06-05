import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTicketFeedbackReportComponent } from './add-ticket-feedback-report.component';
const routes: Routes = [
  { path: "", component: AddTicketFeedbackReportComponent },

];
@NgModule({
  declarations: [
    AddTicketFeedbackReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AddTicketFeedackReportModule { }
