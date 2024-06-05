import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewLegalInvoiceComponent } from './view-legal-invoice.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: ViewLegalInvoiceComponent },

];

@NgModule({
  declarations: [ViewLegalInvoiceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ViewLegalInvoiceModule { }
