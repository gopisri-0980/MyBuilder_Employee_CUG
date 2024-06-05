import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarParkingInvoiceComponent } from './car-parking-invoice.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: CarParkingInvoiceComponent },

];


@NgModule({
  declarations: [CarParkingInvoiceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CarParkingInvoiceModule { }
