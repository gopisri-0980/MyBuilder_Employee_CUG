import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewComplaintsComponent } from './view-complaints.component';

const routes: Routes = [
  { path: "", component: ViewComplaintsComponent },

];


@NgModule({
  declarations: [ViewComplaintsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  
})
export class ViewComplaintsModule { }
