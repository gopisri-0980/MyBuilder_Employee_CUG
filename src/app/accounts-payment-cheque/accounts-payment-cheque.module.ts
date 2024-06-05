import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountsPaymentChequeComponent } from './accounts-payment-cheque.component';
const routes: Routes = [
  { path: "", component: AccountsPaymentChequeComponent },

];
@NgModule({
  declarations: [
    AccountsPaymentChequeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AccountsPaymentChequeModule { }
