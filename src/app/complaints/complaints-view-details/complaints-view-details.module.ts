import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComplaintsViewDetailsComponent } from './complaints-view-details.component';
import { MatPaginatorModule } from '@angular/material';


const routes: Routes = [
  { path: "", component: ComplaintsViewDetailsComponent },

];



@NgModule({
  declarations: [ComplaintsViewDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
  ]
})
export class ComplaintsViewDetailsModule { }
