import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RaiseInvoiceComponent } from './raise-invoice/raise-invoice.component';
import { AuthGuard } from '../auth.guard';
const routes: Routes = [
  {
    path: '',
    component: RaiseInvoiceComponent,
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LegalInvoiceRoutingModule { }