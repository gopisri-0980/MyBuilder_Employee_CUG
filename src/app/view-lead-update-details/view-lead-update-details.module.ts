import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewLeadUpdateDetailsComponent } from './view-lead-update-details.component';
import { ViewLeadUpdateDetailsService } from './view-lead-update-details.service';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path :'' , component : ViewLeadUpdateDetailsComponent}
];


@NgModule({
  declarations: [ViewLeadUpdateDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers : [ViewLeadUpdateDetailsService]
})
export class ViewLeadUpdateDetailsModule { }
