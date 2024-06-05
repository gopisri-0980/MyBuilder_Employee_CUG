import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApproveBookingComponent } from './approve-booking.component';
import { MatPaginatorModule } from '@angular/material';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { NgxEmojiPickerModule } from 'ngx-emoji-picker';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularMaterialModule } from '../modules/angular-material.module';
const routes: Routes = [
  { path: "", component: ApproveBookingComponent },

];

@NgModule({
  declarations: [ApproveBookingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    

    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxEmojiPickerModule.forRoot(),
    DeviceDetectorModule.forRoot(),
    AutocompleteLibModule,
    AngularEditorModule,
    NgbModule,
    MatPaginatorModule,
    AngularMultiSelectModule,
    AngularMaterialModule
  ],
})
export class ApproveBookingModule { }
