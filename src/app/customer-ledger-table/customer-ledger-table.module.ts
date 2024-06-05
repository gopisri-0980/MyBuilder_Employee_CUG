import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerLedgerTableComponent } from './customer-ledger-table.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: CustomerLedgerTableComponent },

];

@NgModule({
  declarations: [CustomerLedgerTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CustomerLedgerTableModule { }
