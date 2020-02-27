import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGroupComponent } from './components/add-group/add-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';



@NgModule({
  declarations: [AddGroupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutocompleteLibModule
  ],
  exports: [AddGroupComponent]
})
export class GroupModule { }
