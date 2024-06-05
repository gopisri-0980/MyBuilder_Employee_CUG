import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizonCustomerComponent } from './horizon-customer.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: HorizonCustomerComponent },

];

@NgModule({
  declarations: [HorizonCustomerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HorizonCustomerModule { }
