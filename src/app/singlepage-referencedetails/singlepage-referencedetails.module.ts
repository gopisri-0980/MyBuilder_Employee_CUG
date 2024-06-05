import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SinglepageReferencedetailsComponent } from './singlepage-referencedetails.component';
const routes: Routes = [
  { path: "", component: SinglepageReferencedetailsComponent },

];
@NgModule({
  declarations: [
    SinglepageReferencedetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SinglepageReferencedetailsModule { }
