import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewLeadCreationComponent } from './view-lead-creation.component';
const routes: Routes = [
  { path: "", component: ViewLeadCreationComponent },

];
@NgModule({
  declarations: [
    ViewLeadCreationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ViewLeadCreationModule { }
