import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisReceiptOnlineComponent } from './mis-receipt-online.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: MisReceiptOnlineComponent },

];

@NgModule({
  declarations: [MisReceiptOnlineComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MisReceiptOnlineModule { }
