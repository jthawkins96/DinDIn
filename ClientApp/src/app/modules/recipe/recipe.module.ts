import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipeHomeComponent } from './components/recipe-home/recipe-home.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';



@NgModule({
  declarations: [RecipeFormComponent, RecipeComponent, RecipeHomeComponent, AddRecipeComponent, EditRecipeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RecipeRoutingModule,
    NgxDatatableModule
  ],
  exports: [
    RecipeComponent
  ]
})
export class RecipeModule { }
