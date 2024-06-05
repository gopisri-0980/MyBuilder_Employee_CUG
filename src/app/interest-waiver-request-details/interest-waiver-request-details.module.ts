import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterestWaiverRequestDetailsComponent } from './interest-waiver-request-details.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterestWaiverRequestDetailsService } from './interest-waiver-request-details.service';

const routes: Routes = [
  { path: "", component: InterestWaiverRequestDetailsComponent},

];



@NgModule({
  declarations: [InterestWaiverRequestDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers:[InterestWaiverRequestDetailsService]
})
export class InterestWaiverRequestDetailsModule { }
