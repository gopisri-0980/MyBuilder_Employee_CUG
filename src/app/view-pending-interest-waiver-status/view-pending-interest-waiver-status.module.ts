import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPendingInterestWaiverStatusComponent } from './view-pending-interest-waiver-status.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

const routes: Routes = [
  { path: "", component: ViewPendingInterestWaiverStatusComponent},

];

@NgModule({
  declarations: [ViewPendingInterestWaiverStatusComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule
  ]
})
export class ViewPendingInterestWaiverStatusModule { }
