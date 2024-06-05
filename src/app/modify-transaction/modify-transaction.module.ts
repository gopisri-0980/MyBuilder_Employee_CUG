import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifyTransactionComponent } from './modify-transaction.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: ModifyTransactionComponent },

];

@NgModule({
  declarations: [ModifyTransactionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ModifyTransactionModule { }
