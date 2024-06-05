import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateBankAccountDetailsComponent } from './update-bank-account-details.component';
import { UpdateBankAccountDetailsService } from './update-bank-account-details.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: "", component: UpdateBankAccountDetailsComponent },

];

@NgModule({
  declarations: [UpdateBankAccountDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    AngularMultiSelectModule,
    NgbModule,
  ],
  providers : [UpdateBankAccountDetailsService]
})
export class UpdateBankAccountDetailsModule { }
