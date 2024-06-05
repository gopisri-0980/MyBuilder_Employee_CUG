import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnclearedChequeListComponent } from './uncleared-cheque-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
const routes: Routes = [
  { path: "", component: UnclearedChequeListComponent },

];

@NgModule({
  declarations: [UnclearedChequeListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule
  ]
})
export class UnclearedChequeListModule { }
