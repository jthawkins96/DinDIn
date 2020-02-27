import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../modules/home/pages/home/home.component';
import { VoteComponent } from '../modules/vote/pages/vote/vote.component';
import { AddRecipeComponent } from '../modules/admin/pages/add-recipe/add-recipe.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddGroupComponent } from '../modules/group/components/add-group/add-group.component';

const routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'vote', component: VoteComponent },
  { path: 'add-recipe', component: AddRecipeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-group', component: AddGroupComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CoreRoutingModule { }
