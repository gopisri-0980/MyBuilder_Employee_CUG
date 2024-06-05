import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material';
import { TicketsViewDetailsComponent } from './tickets-view-details.component';

const routes: Routes = [
  { path: "", component: TicketsViewDetailsComponent },

];


@NgModule({
  declarations: [TicketsViewDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
  ]
})
export class TicketsViewDetailsModule { }
