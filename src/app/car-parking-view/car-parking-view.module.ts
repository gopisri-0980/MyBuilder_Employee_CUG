import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarParkingViewComponent } from './car-parking-view.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: CarParkingViewComponent },

];

@NgModule({
  declarations: [CarParkingViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CarParkingViewModule { }
