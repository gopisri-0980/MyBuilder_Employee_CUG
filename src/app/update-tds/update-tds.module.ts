import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateTdsComponent } from './update-tds.component';
const routes: Routes = [
  { path: "", component: UpdateTdsComponent },

];
@NgModule({
  declarations: [
    UpdateTdsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UpdateTdsModule { }
