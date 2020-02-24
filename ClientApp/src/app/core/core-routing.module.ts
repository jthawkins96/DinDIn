import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../modules/home/pages/home/home.component';
import { VoteComponent } from '../modules/vote/pages/vote/vote.component';
import { AddRecipeComponent } from '../modules/admin/pages/add-recipe/add-recipe.component';

const routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'vote', component: VoteComponent },
  { path: 'add-recipe', component: AddRecipeComponent }
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
