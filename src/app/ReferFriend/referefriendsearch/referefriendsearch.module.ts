import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferefriendsearchComponent } from './referefriendsearch.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
const routes: Routes = [
  { path: "", component: ReferefriendsearchComponent },

];

@NgModule({
  declarations: [
    ReferefriendsearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule
    
  ]
})
export class ReferefriendsearchModule { }
