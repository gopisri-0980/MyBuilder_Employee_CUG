import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateMilestoneComponent } from './create-milestone.component';
const routes: Routes = [
  { path: "", component: CreateMilestoneComponent },

];
@NgModule({
  declarations: [
    CreateMilestoneComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CreateMilestoneModule { }
