import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditSuspenceentryListComponent } from './edit-suspenceentry-list.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: EditSuspenceentryListComponent },

];

@NgModule({
  declarations: [EditSuspenceentryListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EditSuspenceentryListModule { }
