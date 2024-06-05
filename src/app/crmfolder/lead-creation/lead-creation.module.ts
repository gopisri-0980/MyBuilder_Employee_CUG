import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeadCreationComponent } from './lead-creation.component';
const routes: Routes = [
  { path: "", component: LeadCreationComponent },

];
@NgModule({
  declarations: [
    LeadCreationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LeadCreationModule { }
