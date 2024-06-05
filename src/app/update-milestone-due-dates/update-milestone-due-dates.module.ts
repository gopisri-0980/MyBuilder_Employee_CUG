import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { UpdateMilestoneDueDatesComponent } from './update-milestone-due-dates.component';
const routes: Routes = [
  { path: "", component: UpdateMilestoneDueDatesComponent },

];

@NgModule({
  declarations: [UpdateMilestoneDueDatesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule
  ]

})
export class UpdateMilestoneDueDatesModule { }
