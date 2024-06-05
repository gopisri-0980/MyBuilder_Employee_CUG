import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisPaymentChequeComponent } from './mis-payment-cheque.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: MisPaymentChequeComponent },

];

@NgModule({
  declarations: [MisPaymentChequeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MisPaymentChequeModule { }
