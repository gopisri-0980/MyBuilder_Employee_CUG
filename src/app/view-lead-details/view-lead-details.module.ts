import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewLeadDetailsRoutingModule } from './view-lead-details-routing.module';
import { ViewLeadDetailsComponent } from './view-lead-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ViewLeadDetailsComponent],
  imports: [
    CommonModule,
    ViewLeadDetailsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ]
})
export class ViewLeadDetailsModule { }
