import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableOneProjectWiseTktCountComponent } from './table-one-project-wise-tkt-count.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: TableOneProjectWiseTktCountComponent },

];

@NgModule({
  declarations: [TableOneProjectWiseTktCountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TableOneProjectWiseTktCountModule { }
