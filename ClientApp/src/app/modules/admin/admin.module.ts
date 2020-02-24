import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRecipeFormComponent } from './components/add-recipe-form/add-recipe-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [AddRecipeFormComponent, AddRecipeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    AddRecipeComponent
  ]
})
export class AdminModule { }
