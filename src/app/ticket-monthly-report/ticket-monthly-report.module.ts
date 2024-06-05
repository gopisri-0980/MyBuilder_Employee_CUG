import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketMonthlyReportComponent } from './ticket-monthly-report.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material';

import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
const routes: Routes = [
  { path: "", component: TicketMonthlyReportComponent },

];

@NgModule({
  declarations: [TicketMonthlyReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    AngularEditorModule,
    NgbModule,
    MatPaginatorModule,
  
    AngularMultiSelectModule,
  ]
})
export class TicketMonthlyReportModule { }
