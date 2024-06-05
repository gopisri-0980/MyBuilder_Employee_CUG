import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RaiseInvoiceModificationsComponent } from './raise-invoice-modifications.component';
const routes: Routes = [
  { path: "", component: RaiseInvoiceModificationsComponent },

];
@NgModule({
  declarations: [
    RaiseInvoiceModificationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RaiseInvoiceModificationsModule { }
