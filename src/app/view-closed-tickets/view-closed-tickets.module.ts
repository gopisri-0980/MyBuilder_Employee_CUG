import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewClosedTicketsComponent } from './view-closed-tickets.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: ViewClosedTicketsComponent },

];

@NgModule({
  declarations: [ViewClosedTicketsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ViewClosedTicketsModule { }
