import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmReceiptOnlineCompletedEDITComponent } from './crm-receipt-online-completed-edit.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: CrmReceiptOnlineCompletedEDITComponent },

];

@NgModule({
  declarations: [CrmReceiptOnlineCompletedEDITComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CrmReceiptOnlineCompletedEditModule { }
