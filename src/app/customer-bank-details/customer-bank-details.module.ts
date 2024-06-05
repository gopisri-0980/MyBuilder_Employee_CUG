import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerBankDetailsService } from './customer-bank-details.service';
import { CustomerBankDetailsComponent } from './customer-bank-details.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
const routes: Routes = [
  { path: "", component: CustomerBankDetailsComponent },

];

@NgModule({
  declarations: [CustomerBankDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AutocompleteLibModule
  ],
  providers : [CustomerBankDetailsService]
})
export class CustomerBankDetailsModule { }
