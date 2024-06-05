import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewModificationInvoiceComponent } from './view-modification-invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { ViewmodificationinvoiceService } from './viewmodificationinvoice.service';

const routes: Routes = [
  { path: "", component: ViewModificationInvoiceComponent},

];

@NgModule({
  declarations: [ViewModificationInvoiceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers : [ViewmodificationinvoiceService]
})
export class ViewModificationInvoiceModule { }
