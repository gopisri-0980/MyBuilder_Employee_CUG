import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewCustomersComponent } from './view-customers.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
const routes: Routes = [
  { path: "", component: ViewCustomersComponent },

];

@NgModule({
  declarations: [ViewCustomersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule
  ]
})
export class ViewCustomersModule { }
