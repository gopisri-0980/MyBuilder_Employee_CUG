import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovePendingInvoiceComponent } from './approve-pending-invoice.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApprovependinginvoiceService } from './approvependinginvoice.service';


const routes: Routes = [
  { path: "", component: ApprovePendingInvoiceComponent},

];


@NgModule({
  declarations: [ApprovePendingInvoiceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ApprovependinginvoiceService]
})
export class ApprovePendingInvoiceModule { }
