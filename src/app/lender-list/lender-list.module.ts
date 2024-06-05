import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { LenderListComponent } from './lender-list.component';
const routes: Routes = [
  { path: "", component: LenderListComponent },

];

@NgModule({
  declarations: [
    LenderListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LenderListModule { }
