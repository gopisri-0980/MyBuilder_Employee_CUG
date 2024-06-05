import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyModifViewAndSubmitComponent } from './company-modif-view-and-submit.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: CompanyModifViewAndSubmitComponent },

];

@NgModule({
  declarations: [CompanyModifViewAndSubmitComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CompanyModifViewAndSubmitModule { }
