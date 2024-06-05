import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddViewLeagalInvoiceComponent } from './add-view-leagal-invoice.component';
const routes: Routes = [
  { path: "", component: AddViewLeagalInvoiceComponent },

];
@NgModule({
  declarations: [
    AddViewLeagalInvoiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AddViewLeagalInvoiceModule { }
