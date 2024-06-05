import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SinglepageticketdetailsComponent } from './singlepageticketdetails.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxEmojiPickerModule } from 'ngx-emoji-picker';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
const routes: Routes = [
  { path: "", component: SinglepageticketdetailsComponent },

];
@NgModule({
  declarations: [
    SinglepageticketdetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgbModule,
    MatPaginatorModule,
  
  ]
})
export class SinglepageticketdetailsModule { }
