import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewAssignmentTransferFeeComponent } from './view-assignment-transfer-fee.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  { path: "", component: ViewAssignmentTransferFeeComponent },

];


@NgModule({
  declarations: [ViewAssignmentTransferFeeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbPopoverModule
  ]
})
export class ViewAssignmentTransferFeeModule { }
