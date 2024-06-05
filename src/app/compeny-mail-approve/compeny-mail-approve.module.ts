import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompenyMailApproveComponent } from './compeny-mail-approve.component';
import { UnreadmessagesService } from '../unreadmessages.service';


const routes: Routes = [
  { path: "", component: CompenyMailApproveComponent },

];


@NgModule({
  declarations: [CompenyMailApproveComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers : [UnreadmessagesService]
})
export class CompenyMailApproveModule { }
