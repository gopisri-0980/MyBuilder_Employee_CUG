import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewcustomerdetailsComponent } from './viewcustomerdetails.component';
const routes: Routes = [
  { path: "", component: ViewcustomerdetailsComponent },

];
@NgModule({
  declarations: [
    ViewcustomerdetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ViewcustomerdetailsModule { }
