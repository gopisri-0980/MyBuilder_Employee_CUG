import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCustomerComponent } from './add-customer.component';
import { AddCustomerService } from './add-customer.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  { path: "", component: AddCustomerComponent },

];


@NgModule({
  declarations: [AddCustomerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers : [AddCustomerService]
})
export class AddCustomerModule { }
