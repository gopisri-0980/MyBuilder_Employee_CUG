import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignTicketComponent } from './assign-ticket.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: "", component: AssignTicketComponent },

];

@NgModule({
  declarations: [AssignTicketComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AssignTicketModule { }
