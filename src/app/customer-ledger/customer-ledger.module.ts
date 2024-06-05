import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerLedgerComponent } from './customer-ledger.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: CustomerLedgerComponent },

];

@NgModule({
  declarations: [CustomerLedgerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CustomerLedgerModule { }
