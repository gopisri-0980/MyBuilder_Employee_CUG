import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { BookYourAppointmentComponent } from './book-your-appointment.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material';
import { BookYourAppointmentService } from './book-your-appointment.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { ExcelService } from './excel.service';

const routes: Routes = [
  { path: "", component: BookYourAppointmentComponent},

];

@NgModule({
  declarations: [BookYourAppointmentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatPaginatorModule,
    NgxPaginationModule
  ],
  providers: [BookYourAppointmentService , ExcelService]
})
export class BookYourAppointmentModule { }
