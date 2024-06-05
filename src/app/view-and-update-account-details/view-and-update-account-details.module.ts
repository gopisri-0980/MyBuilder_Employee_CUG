import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewAndUpdateAccountDetailsComponent } from './view-and-update-account-details.component';
import { ViewAndUpdateAccountDetailsService } from './view-and-update-account-details.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  { path: "", component: ViewAndUpdateAccountDetailsComponent },

];


@NgModule({
  declarations: [ViewAndUpdateAccountDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AngularMultiSelectModule,
    NgbModule,
  ],
  providers : [ViewAndUpdateAccountDetailsService]
})
export class ViewAndUpdateAccountDetailsModule { }
