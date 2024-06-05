import {  LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDemandNoteComponent } from './view-demand-note.component';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [
  { path: "", component: ViewDemandNoteComponent },

];

@NgModule({
  declarations: [ViewDemandNoteComponent],
  providers: [{ provide: LOCALE_ID, useValue: "en-IN" }],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],

})
export class ViewDemandNoteModule { }
