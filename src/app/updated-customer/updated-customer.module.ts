import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatedCustomerComponent } from './updated-customer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UpdatedCustomerService } from './updated-customer.service';

const routes: Routes = [
  { path: "", component: UpdatedCustomerComponent },

];

@NgModule({
  declarations: [UpdatedCustomerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers : [UpdatedCustomerService]
})
export class UpdatedCustomerModule { }
