import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewReferalDataComponent } from './view-referal-data.component';
const routes: Routes = [
  { path: "", component: ViewReferalDataComponent },

];
@NgModule({
  declarations: [
    ViewReferalDataComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
  
})
export class ViewReferalDataModule { }
