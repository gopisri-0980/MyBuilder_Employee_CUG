import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModifyCrmReceiptChequeViewComponent } from './modify-crm-receipt-cheque-view.component';
const routes: Routes = [
  { path: "", component: ModifyCrmReceiptChequeViewComponent },

];
@NgModule({
  declarations: [
    ModifyCrmReceiptChequeViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ModifyCrmReceiptChequeViewModule { }
