import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsReceiptChequeComponent } from './accounts-receipt-cheque.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: AccountsReceiptChequeComponent },

];

@NgModule({
  declarations: [AccountsReceiptChequeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AccountsReceiptChequeModule { }
