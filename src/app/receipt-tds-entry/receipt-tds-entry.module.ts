import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReceiptTdsEntryComponent } from './receipt-tds-entry.component';


const routes: Routes = [
  { path: "", component: ReceiptTdsEntryComponent },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ReceiptTdsEntryModule { }
