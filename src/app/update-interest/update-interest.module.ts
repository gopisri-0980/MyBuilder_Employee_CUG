import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateInterestComponent } from './update-interest.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: UpdateInterestComponent },

];

@NgModule({
  declarations: [UpdateInterestComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UpdateInterestModule { }
