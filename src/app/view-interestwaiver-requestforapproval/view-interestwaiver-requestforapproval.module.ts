import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { ViewInterestwaiverRequestforapprovalService } from './view-interestwaiver-requestforapproval.service';
import { ViewInterestwaiverRequestforapprovalComponent } from './view-interestwaiver-requestforapproval.component';

const routes: Routes = [
  { path: "", component: ViewInterestwaiverRequestforapprovalComponent },

];


@NgModule({
  declarations: [ViewInterestwaiverRequestforapprovalComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers : [ViewInterestwaiverRequestforapprovalService]
})
export class ViewInterestwaiverRequestforapprovalModule { }
