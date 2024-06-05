import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateDemandNoteComponent } from './generate-demand-note.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: "", component: GenerateDemandNoteComponent },

];

@NgModule({
  declarations: [GenerateDemandNoteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
    NgbModule
    
  ]
})
export class GenerateDemandNoteModule { }
