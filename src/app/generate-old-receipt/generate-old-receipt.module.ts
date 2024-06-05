import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateOldReceiptComponent } from './generate-old-receipt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
const routes: Routes = [
  { path: "", component: GenerateOldReceiptComponent},

];


@NgModule({
  declarations: [GenerateOldReceiptComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class GenerateOldReceiptModule { }
