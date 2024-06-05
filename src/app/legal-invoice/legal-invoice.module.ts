import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { RaiseInvoiceComponent } from './raise-invoice/raise-invoice.component';
import { LegalInvoiceRoutingModule } from './legal-invoice-routing.module';

@NgModule({
declarations: [RaiseInvoiceComponent],
imports: [
CommonModule,
FormsModule,
RouterModule,
LegalInvoiceRoutingModule
],
exports: [
  RaiseInvoiceComponent,
]
})
export class LegalInvoiceModule { }
