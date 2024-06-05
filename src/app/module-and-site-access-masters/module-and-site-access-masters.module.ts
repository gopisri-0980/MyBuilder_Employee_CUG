import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleAndSiteAccessMastersComponent } from './module-and-site-access-masters.component';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ModuleAndSiteAccessMastersService } from './module-and-site-access-masters.service';


const routes: Routes = [
  { path: "", component: ModuleAndSiteAccessMastersComponent },

];


@NgModule({
  declarations: [ModuleAndSiteAccessMastersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AngularMultiSelectModule
  ],
  providers: [ModuleAndSiteAccessMastersService]
})
export class ModuleAndSiteAccessMastersModule { }
