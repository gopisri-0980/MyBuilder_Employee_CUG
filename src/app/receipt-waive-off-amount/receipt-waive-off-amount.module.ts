import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReceiptWaiveOffAmountComponent } from './receipt-waive-off-amount.component';

const routes: Routes = [
  { path: "", component: ReceiptWaiveOffAmountComponent },

];

@NgModule({
  declarations: [ReceiptWaiveOffAmountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ReceiptWaiveOffAmountModule { }
