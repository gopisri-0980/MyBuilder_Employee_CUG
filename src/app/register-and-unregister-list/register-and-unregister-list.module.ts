import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterAndUnregisterListComponent } from './register-and-unregister-list.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/multiselect.component';


const routes: Routes = [
  { path: "", component: RegisterAndUnregisterListComponent },

];


@NgModule({
  declarations: [RegisterAndUnregisterListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule
  ]
})
export class RegisterAndUnregisterListModule { }
