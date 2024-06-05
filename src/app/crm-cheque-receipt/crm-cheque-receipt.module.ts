import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmChequeReceiptComponent } from './crm-cheque-receipt.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: CrmChequeReceiptComponent},

];

@NgModule({
  declarations: [CrmChequeReceiptComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CrmChequeReceiptModule { }
