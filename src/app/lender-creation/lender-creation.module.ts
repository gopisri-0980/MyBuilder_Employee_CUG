import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LenderCreationComponent } from './lender-creation.component';
const routes: Routes = [
  { path: "", component: LenderCreationComponent },

];

@NgModule({
  declarations: [
    LenderCreationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LenderCreationModule { }
