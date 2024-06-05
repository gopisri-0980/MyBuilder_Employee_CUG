import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectwiseEscalationReportComponent } from './projectwise-escalation-report.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectwiseEscalationReportService } from './projectwise-escalation-report.service';

const routes: Routes = [
  { path: "", component: ProjectwiseEscalationReportComponent },

];


@NgModule({
  declarations: [ProjectwiseEscalationReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],

  providers : [ProjectwiseEscalationReportService]


})
export class ProjectwiseEscalationReportModule { }
