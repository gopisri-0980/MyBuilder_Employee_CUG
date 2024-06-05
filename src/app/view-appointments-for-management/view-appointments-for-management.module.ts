import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material';
import {NgxPaginationModule} from 'ngx-pagination';
import { ViewAppointmentsForManagementComponent } from './view-appointments-for-management.component';
import { ViewAppointmentsForManagementService } from './view-appointments-for-management.service';
import { ExcelService } from './excel.service';

const routes: Routes = [
  { path: "", component: ViewAppointmentsForManagementComponent},

];

@NgModule({
  declarations: [ViewAppointmentsForManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatPaginatorModule,
    NgxPaginationModule
  ],
  providers: [ViewAppointmentsForManagementService ,ExcelService]
})
export class ViewAppointmentsForManagementModule { }
