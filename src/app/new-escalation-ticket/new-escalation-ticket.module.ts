import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewEscalationTicketComponent } from './new-escalation-ticket.component';
import { RouterModule, Routes } from "@angular/router";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  { path: "", component: NewEscalationTicketComponent},

];

@NgModule({
  declarations: [NewEscalationTicketComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ]
})
export class NewEscalationTicketModule { }
