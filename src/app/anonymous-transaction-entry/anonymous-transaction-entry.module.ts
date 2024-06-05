import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnonymousTransactionEntryComponent } from './anonymous-transaction-entry.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: AnonymousTransactionEntryComponent },

];

@NgModule({
  declarations: [AnonymousTransactionEntryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AnonymousTransactionEntryModule { }
