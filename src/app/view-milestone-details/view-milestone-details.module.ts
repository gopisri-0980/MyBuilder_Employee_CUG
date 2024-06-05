import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewMilestoneDetailsComponent } from './view-milestone-details.component';

const routes: Routes = [
  { path: "", component: ViewMilestoneDetailsComponent },

];
@NgModule({
  declarations: [
    ViewMilestoneDetailsComponent
  ],
  imports: [
      CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
   
  ]
})
export class ViewMilestoneDetailsModule { }
