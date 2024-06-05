import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NocDetailsComponent } from './noc-details.component'
import { RouterModule, Routes } from "@angular/router";
import { NocDetailsService } from './noc-details.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
const routes: Routes = [
  { path: "", component: NocDetailsComponent },

];

@NgModule({
  declarations: [NocDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,

  ],
  providers : [NocDetailsService]
})
export class NocDetailsModule { }
