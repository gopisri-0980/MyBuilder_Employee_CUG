import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MPRViewComponent } from './mpr-view.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: MPRViewComponent },

];

@NgModule({
  declarations: [MPRViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MprViewModule { }
