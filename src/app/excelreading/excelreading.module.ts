import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExcelreadingComponent } from './excelreading.component';
const routes: Routes = [
  { path: "", component: ExcelreadingComponent },

];
@NgModule({
  declarations: [
    ExcelreadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ExcelreadingModule { }
