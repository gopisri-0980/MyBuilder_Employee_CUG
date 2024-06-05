import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewInterestLetterComponent } from './view-interest-letter.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: ViewInterestLetterComponent },

];

@NgModule({
  declarations: [ViewInterestLetterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ViewInterestLetterModule { }
