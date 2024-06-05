import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveWaiveOffComponent } from './approve-waive-off.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: "", component: ApproveWaiveOffComponent},

];

@NgModule({
  declarations: [ApproveWaiveOffComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ApproveWaiveOffModule { }
