import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmReceiptPaymentComponent } from './crm-receipt-payment.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: CrmReceiptPaymentComponent },

];

@NgModule({
  declarations: [CrmReceiptPaymentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CrmReceiptPaymentModule { }
