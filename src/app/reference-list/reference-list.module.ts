import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReferenceListComponent } from './reference-list.component';

const routes: Routes = [
  { path: "", component: ReferenceListComponent },

];
@NgModule({
  declarations: [
    ReferenceListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ReferenceListModule { }
