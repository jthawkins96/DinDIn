import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { RecipeHomeComponent } from './components/recipe-home/recipe-home.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';

const routes: Routes = [
  { path: 'recipes', component: RecipeComponent, children: [
    { path: '', pathMatch:'full', component: RecipeHomeComponent },
    { path: 'add-recipe', component: AddRecipeComponent },
  ]}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecipeRoutingModule { }
