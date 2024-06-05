import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmReceiptChequeCompletedEDITComponent } from './crm-receipt-cheque-completed-edit.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: CrmReceiptChequeCompletedEDITComponent },

];

@NgModule({
  declarations: [CrmReceiptChequeCompletedEDITComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CrmReceiptChequeCompletedEditModule { }
