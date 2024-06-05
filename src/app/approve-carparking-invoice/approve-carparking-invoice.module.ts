import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveCarparkingInvoiceComponent } from './approve-carparking-invoice.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApproveCarparkingInvoiceService } from './approve-carparking-invoice.service';
const routes: Routes = [
  { path: "", component: ApproveCarparkingInvoiceComponent },

];


@NgModule({
  declarations: [ApproveCarparkingInvoiceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers : [ApproveCarparkingInvoiceService]
})
export class ApproveCarparkingInvoiceModule { }
