import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModifyCrmReceiptPaymentViewComponent } from './modify-crm-receipt-payment-view.component';
const routes: Routes = [
  { path: "", component: ModifyCrmReceiptPaymentViewComponent },

];
@NgModule({
  declarations: [
    ModifyCrmReceiptPaymentViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ModifyCrmReceiptPaymentViewModule { }
