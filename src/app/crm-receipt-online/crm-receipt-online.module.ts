import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmReceiptOnlineComponent } from './crm-receipt-online.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: CrmReceiptOnlineComponent },

];


@NgModule({
  declarations: [CrmReceiptOnlineComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CrmReceiptOnlineModule { }
