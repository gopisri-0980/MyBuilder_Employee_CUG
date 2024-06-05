import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrmPaymentChequeCompletedEDITComponent } from './crm-payment-cheque-completed-edit.component';
const routes: Routes = [
  { path: "", component: CrmPaymentChequeCompletedEDITComponent },

];
@NgModule({
  declarations: [
    CrmPaymentChequeCompletedEDITComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CrmPaymentChequeCompletedEditModule { }
