import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingformComponent } from './bookingform.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: BookingformComponent },

];

@NgModule({
  declarations: [BookingformComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class BookingformModule { }
