import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuspenseEntriesReportComponent } from './suspense-entries-report.component';
import { RouterModule, Routes } from "@angular/router";
import { SuspenseEntriesReportService } from './suspense-entries-report.service';

const routes: Routes = [
  { path: "", component: SuspenseEntriesReportComponent },

];


@NgModule({
  declarations: [SuspenseEntriesReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers : [SuspenseEntriesReportService]
})
export class SuspenseEntriesReportModule { }
