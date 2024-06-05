import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadMPRComponent } from './upload-mpr.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: UploadMPRComponent },

];

@NgModule({
  declarations: [UploadMPRComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class UploadMprModule { }
