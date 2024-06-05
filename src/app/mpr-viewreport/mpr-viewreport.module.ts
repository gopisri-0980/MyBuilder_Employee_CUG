import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MprViewreportComponent } from './mpr-viewreport.component';
import { MprViewreportService } from './mpr-viewreport.service';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", component: MprViewreportComponent},

];


@NgModule({
  declarations: [MprViewreportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers: [MprViewreportService]
})
export class MprViewreportModule { }
