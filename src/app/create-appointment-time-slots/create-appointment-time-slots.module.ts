import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAppointmentTimeSlotsComponent } from './create-appointment-time-slots.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { CreateAppointmentTimeSlotsService } from './create-appointment-time-slots.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { A11yModule } from '@angular/cdk/a11y';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



const routes: Routes = [
  { path: "", component: CreateAppointmentTimeSlotsComponent },

];


@NgModule({
  declarations: [CreateAppointmentTimeSlotsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  
    // MatDatepickerModule,
    // MatChipsModule,
    // MatFormFieldModule,
    // MatIconModule,
    // MatNativeDateModule,
    // MatNativeDateModule,
    // ReactiveFormsModule,
    // MatInputModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
   
    PortalModule,
    ScrollingModule,


  ],
  providers: [CreateAppointmentTimeSlotsService]
})
export class CreateAppointmentTimeSlotsModule { }
