import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LenderViewDetailsComponent } from './lender-view-details.component';
const routes: Routes = [
  { path: "", component: LenderViewDetailsComponent },

];

@NgModule({
  declarations: [
    LenderViewDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LenderViewDetailsModule { }
