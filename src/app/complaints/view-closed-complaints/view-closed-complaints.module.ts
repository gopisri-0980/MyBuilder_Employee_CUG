import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material';
import { ViewClosedComplaintsComponent } from './view-closed-complaints.component';
import { ViewClosedComplaintsService } from './view-closed-complaints.service';

const routes: Routes = [
  { path: "", component: ViewClosedComplaintsComponent },

];



@NgModule({
  declarations: [ViewClosedComplaintsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,

  ],

  providers : [ViewClosedComplaintsService]
})
export class ViewClosedComplaintsModule { }
