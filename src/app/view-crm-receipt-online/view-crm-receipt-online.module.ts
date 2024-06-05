import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCrmReceiptOnlineComponent } from './view-crm-receipt-online.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: ViewCrmReceiptOnlineComponent },

];

@NgModule({
  declarations: [ViewCrmReceiptOnlineComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ViewCrmReceiptOnlineModule { }
