import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditSuspenceentryViewComponent } from './edit-suspenceentry-view.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: EditSuspenceentryViewComponent },

];

@NgModule({
  declarations: [EditSuspenceentryViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EditSuspenceentryViewModule { }
