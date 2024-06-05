import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { CrmPaymentOnlineEditComponent } from './crm-payment-online-edit.component';
const routes: Routes = [
  { path: "", component: CrmPaymentOnlineEditComponent },

];
@NgModule({
  declarations: [
    CrmPaymentOnlineEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CrmPaymentOnlineEditModule { }
