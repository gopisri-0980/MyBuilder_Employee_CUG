import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectNotficationViewReportComponent } from './project-notfication-view-report.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: ProjectNotficationViewReportComponent },

];


@NgModule({
  declarations: [ProjectNotficationViewReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProjectNotficationViewReportModule { }
