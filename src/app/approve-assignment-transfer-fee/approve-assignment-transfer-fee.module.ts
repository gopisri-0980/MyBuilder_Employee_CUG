import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveAssignmentTransferFeeComponent } from './approve-assignment-transfer-fee.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: "", component: ApproveAssignmentTransferFeeComponent },

];


@NgModule({
  declarations: [ApproveAssignmentTransferFeeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ApproveAssignmentTransferFeeModule { }
