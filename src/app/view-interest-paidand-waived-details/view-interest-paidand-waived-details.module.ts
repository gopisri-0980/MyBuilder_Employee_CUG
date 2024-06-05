import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewInterestPaidandWaivedDetailsComponent } from './view-interest-paidand-waived-details.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: "", component: ViewInterestPaidandWaivedDetailsComponent},

];

@NgModule({
  declarations: [ViewInterestPaidandWaivedDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class ViewInterestPaidandWaivedDetailsModule { }
