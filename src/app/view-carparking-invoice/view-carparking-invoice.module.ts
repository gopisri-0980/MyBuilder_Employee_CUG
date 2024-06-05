import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCarparkingInvoiceComponent } from './view-carparking-invoice.component';
import { ViewCarparkingInvoiceService } from './view-carparking-invoice.service';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  { path: "", component: ViewCarparkingInvoiceComponent },

];


@NgModule({
  declarations: [ViewCarparkingInvoiceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbPopoverModule
  ],
  providers:[ViewCarparkingInvoiceService]
})
export class ViewCarparkingInvoiceModule { }
