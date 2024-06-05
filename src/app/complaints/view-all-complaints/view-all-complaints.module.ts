import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material';
import { ViewAllComplaintsComponent } from './view-all-complaints.component';


const routes: Routes = [
  { path: "", component: ViewAllComplaintsComponent },

];


@NgModule({
  declarations: [ViewAllComplaintsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,

  ]
})
export class ViewAllComplaintsModule { }
