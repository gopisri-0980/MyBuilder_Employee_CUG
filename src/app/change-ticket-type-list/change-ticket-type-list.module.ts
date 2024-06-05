import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeTicketTypeListComponent } from './change-ticket-type-list.component';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { Ng2SearchPipeModule } from 'ng2-search-filter';
const routes: Routes = [
  { path: "", component: ChangeTicketTypeListComponent },

];
@NgModule({
  declarations: [
    ChangeTicketTypeListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ]
})
export class ChangeTicketTypeListModule { }
