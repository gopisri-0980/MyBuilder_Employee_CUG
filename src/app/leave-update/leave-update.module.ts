import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveUpdateComponent } from './leave-update.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: LeaveUpdateComponent },

];

@NgModule({
  declarations: [LeaveUpdateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LeaveUpdateModule { }
