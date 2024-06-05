import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegenerateDemandNoteComponent } from './regenerate-demand-note.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
const routes: Routes = [
  { path: "", component: RegenerateDemandNoteComponent },

];

@NgModule({
  declarations: [RegenerateDemandNoteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    NgbModule
  ]
})
export class RegenerateDemandNoteModule { }
