import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadCreationListComponent } from './lead-creation-list.component';
const routes: Routes = [
  { path: "", component: LeadCreationListComponent },

];
@NgModule({
  declarations: [
    LeadCreationListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LeadCreationListModule { }
