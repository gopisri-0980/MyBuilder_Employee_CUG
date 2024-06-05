import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewIntrestwalverdetailsofapproveComponent } from './view-intrestwalverdetailsofapprove.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule } from '@angular/material';


const routes: Routes = [
  { path: "", component: ViewIntrestwalverdetailsofapproveComponent},

];


@NgModule({
  declarations: [ViewIntrestwalverdetailsofapproveComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    MatPaginatorModule,
  ]
})
export class ViewIntrestwalverdetailsofapproveModule { }
