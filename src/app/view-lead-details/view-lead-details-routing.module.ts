import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewLeadDetailsComponent } from './view-lead-details.component';
import { ViewLeadDetailsService } from './view-lead-details.service';

const routes: Routes = [
  {path :'' , component : ViewLeadDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers : [ViewLeadDetailsService]
})
export class ViewLeadDetailsRoutingModule { }
