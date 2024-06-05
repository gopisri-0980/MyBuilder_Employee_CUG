import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAccountAndUpdateAccountComponent } from './add-account-and-update-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

const routes: Routes = [
  { path: "", component: AddAccountAndUpdateAccountComponent },

];


@NgModule({
  declarations: [AddAccountAndUpdateAccountComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule
  ]
})
export class AddAccountAndUpdateAccountModule { }
