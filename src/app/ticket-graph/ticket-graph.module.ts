import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketGraphComponent } from './ticket-graph.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: "", component: TicketGraphComponent},

];

@NgModule({
  declarations: [TicketGraphComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TicketGraphModule { }
