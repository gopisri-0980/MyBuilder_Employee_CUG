import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateLeadListComponent } from './update-lead-list.component';
const routes: Routes = [
  { path: "", component: UpdateLeadListComponent },

];
@NgModule({
  declarations: [
    UpdateLeadListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UpdateLeadListModule { }
