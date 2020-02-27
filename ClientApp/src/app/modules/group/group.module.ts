import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddGroupComponent } from './components/add-group/add-group.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { GroupComponent } from './pages/group/group.component';
import { GroupHomeComponent } from './components/group-home/group-home.component';
import { GroupRoutingModule } from './group-routing.module';



@NgModule({
  declarations: [AddGroupComponent, GroupComponent, GroupHomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    GroupRoutingModule
  ],
  exports: [AddGroupComponent, GroupComponent, GroupRoutingModule]
})
export class GroupModule { }
