import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketAverageTimesidemenuComponent } from './ticket-average-timesidemenu.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: TicketAverageTimesidemenuComponent },

];


@NgModule({
  declarations: [TicketAverageTimesidemenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TicketAverageTimesidemenuModule { }
