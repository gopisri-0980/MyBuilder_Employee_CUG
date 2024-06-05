import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletedTransactionsComponent } from './completed-transactions.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: CompletedTransactionsComponent },

];

@NgModule({
  declarations: [CompletedTransactionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CompletedTransactionsModule { }
