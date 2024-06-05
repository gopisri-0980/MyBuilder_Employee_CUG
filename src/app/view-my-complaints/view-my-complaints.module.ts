import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMyComplaintsComponent } from './view-my-complaints.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ViewmycomplaintsService } from './viewmycomplaints.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes: Routes = [
  { path: "", component: ViewMyComplaintsComponent },

];



@NgModule({
  declarations: [ViewMyComplaintsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AutocompleteLibModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ],
  providers:[ViewmycomplaintsService]
})
export class ViewMyComplaintsModule { }
