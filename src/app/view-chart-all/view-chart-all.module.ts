import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewChartAllComponent } from './view-chart-all.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
const routes: Routes = [
  { path: "", component: ViewChartAllComponent },

];

@NgModule({
  declarations: [ViewChartAllComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
  ]
})
export class ViewChartAllModule { }
