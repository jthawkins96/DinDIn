import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GroupComponent } from './pages/group/group.component';
import { GroupHomeComponent } from './components/group-home/group-home.component';
import { AddGroupComponent } from './components/add-group/add-group.component';
import { EditGroupComponent } from './components/edit-group/edit-group.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CanEditGroupGuard } from 'src/app/core/guards/can-edit-group.guard';
import { GroupManagerComponent } from './components/group-manager/group-manager.component';

const routes: Routes = [
  {
    path: 'groups',
    component: GroupComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: GroupHomeComponent, pathMatch: 'full' },
      { path: 'add-group', component: AddGroupComponent },
      { path: 'edit-group/:id', component: EditGroupComponent, canActivate: [CanEditGroupGuard] },
      { path: 'manage/:id', component: GroupManagerComponent, canActivate: [CanEditGroupGuard] },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule {}
