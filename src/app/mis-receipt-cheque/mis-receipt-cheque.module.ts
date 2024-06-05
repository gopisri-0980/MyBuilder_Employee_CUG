import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisReceiptChequeComponent } from './mis-receipt-cheque.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: MisReceiptChequeComponent },

];

@NgModule({
  declarations: [MisReceiptChequeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MisReceiptChequeModule { }
