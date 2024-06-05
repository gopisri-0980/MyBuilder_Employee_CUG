import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModifyCrmReceiptOnlineViewComponent } from './modify-crm-receipt-online-view.component';
const routes: Routes = [
  { path: "", component: ModifyCrmReceiptOnlineViewComponent },

];
@NgModule({
  declarations: [
    ModifyCrmReceiptOnlineViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ModifyCrmReceiptOnlineViewModule { }
