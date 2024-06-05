import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionDetailsBankStatementViewComponent } from './transaction-details-bank-statement-view.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
const routes: Routes = [
  { path: "", component: TransactionDetailsBankStatementViewComponent },

];


@NgModule({
  declarations: [TransactionDetailsBankStatementViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule
  ]
})
export class TransactionDetailsBankStatementViewModule { }
