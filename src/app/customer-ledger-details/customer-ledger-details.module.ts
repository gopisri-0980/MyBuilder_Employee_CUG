import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerLedgerDetailsComponent } from './customer-ledger-details.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: CustomerLedgerDetailsComponent },

];

@NgModule({
  declarations: [CustomerLedgerDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CustomerLedgerDetailsModule { }
