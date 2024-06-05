import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TDSUploadComponent } from './tdsupload.component';
const routes: Routes = [
  { path: "", component: TDSUploadComponent },

];
@NgModule({
  declarations: [
    TDSUploadComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TdsuploadModule { }
