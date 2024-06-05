import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketingManagementDashboardComponent } from './ticketing-management-dashboard.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { NgxEmojiPickerModule } from 'ngx-emoji-picker';
import { NgxPaginationModule } from 'ngx-pagination';
const routes: Routes = [
  { path: "", component: TicketingManagementDashboardComponent },

];

@NgModule({
  declarations: [TicketingManagementDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxEmojiPickerModule.forRoot(),
    DeviceDetectorModule.forRoot(),
    AutocompleteLibModule,
    AngularEditorModule,
    NgbModule,
    MatPaginatorModule,
  ]
})
export class TicketingManagementDashboardModule { }
