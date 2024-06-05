import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketFeedbackReportComponent } from './ticket-feedback-report.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: TicketFeedbackReportComponent },

];

@NgModule({
  declarations: [TicketFeedbackReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TicketFeedbackReportModule { }
