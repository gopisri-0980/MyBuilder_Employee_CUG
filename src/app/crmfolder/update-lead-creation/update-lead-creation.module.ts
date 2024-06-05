import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateLeadCreationComponent } from './update-lead-creation.component';
const routes: Routes = [
  { path: "", component: UpdateLeadCreationComponent },

];
@NgModule({
  declarations: [
    UpdateLeadCreationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UpdateLeadCreationModule { }
