import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterestWaiverDetailsComponent } from './interest-waiver-details.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: "", component: InterestWaiverDetailsComponent},

];

@NgModule({
  declarations: [InterestWaiverDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ]
})
export class InterestWaiverDetailsModule { }
