import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewAppointmentScheduleComponent } from './view-appointment-schedule.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from "@angular/router";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatPaginatorModule } from '@angular/material';
import { ViewAppointmentScheduleService } from './view-appointment-schedule.service';
import {NgxPaginationModule} from 'ngx-pagination';

const routes: Routes = [
  { path: "", component: ViewAppointmentScheduleComponent },

];

@NgModule({
  declarations: [ViewAppointmentScheduleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatIconModule
  ],
  providers: [ViewAppointmentScheduleService]


})
export class ViewAppointmentScheduleModule { }
