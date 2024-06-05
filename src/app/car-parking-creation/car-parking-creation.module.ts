import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarParkingCreationComponent } from './car-parking-creation.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
const routes: Routes = [
  { path: "", component: CarParkingCreationComponent },

];

@NgModule({
  declarations: [CarParkingCreationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
  ]
})
export class CarParkingCreationModule { }
