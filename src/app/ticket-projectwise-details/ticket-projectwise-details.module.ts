import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketProjectwiseDetailsComponent } from './ticket-projectwise-details.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: TicketProjectwiseDetailsComponent },

];

@NgModule({
  declarations: [TicketProjectwiseDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TicketProjectwiseDetailsModule { }
