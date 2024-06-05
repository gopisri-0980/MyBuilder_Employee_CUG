import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortcutComponentsComponent } from './shortcut-components.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
const routes: Routes = [
  { path: "", component: ShortcutComponentsComponent },

];

@NgModule({
  declarations: [ShortcutComponentsComponent],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
  ]
})
export class ShortcutComponentsModule { }
