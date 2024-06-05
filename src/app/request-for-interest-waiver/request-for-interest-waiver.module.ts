import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestForInterestWaiverComponent } from './request-for-interest-waiver.component';
import { RouterModule, Routes } from "@angular/router";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
const routes: Routes = [
  { path: "", component: RequestForInterestWaiverComponent},

];

@NgModule({
  declarations: [RequestForInterestWaiverComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule
    
  ]
})
export class RequestForInterestWaiverModule { }
