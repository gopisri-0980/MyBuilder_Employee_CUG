import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketTypeReportforAllProjectsService } from './ticket-type-reportfor-all-projects.service';
import { TicketTypeReportforAllProjectsComponent } from './ticket-type-reportfor-all-projects.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: TicketTypeReportforAllProjectsComponent },

];


@NgModule({
  declarations: [TicketTypeReportforAllProjectsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers : [TicketTypeReportforAllProjectsService]
})
export class TicketTypeReportforAllProjectsModule { }
