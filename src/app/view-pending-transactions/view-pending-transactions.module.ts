import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPendingTransactionsComponent } from './view-pending-transactions.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

const routes: Routes = [
  { path: "", component: ViewPendingTransactionsComponent },

];

@NgModule({
  declarations: [ViewPendingTransactionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule
  ]
})
export class ViewPendingTransactionsModule { }
