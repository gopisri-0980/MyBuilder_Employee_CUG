import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmReceiptChequeViewComponent } from './crm-receipt-cheque-view.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: CrmReceiptChequeViewComponent },

];

@NgModule({
  declarations: [CrmReceiptChequeViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CrmReceiptChequeViewModule { }
