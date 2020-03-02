import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeClientService {
  recipeApiUrl = `${environment.apiUrl}/recipes`;

  constructor(private httpClient: HttpClient) { }

  addRecipe(recipe: Recipe) {
    return this.httpClient.post(this.recipeApiUrl, recipe);
  }

  updateRecipe(recipe: Recipe) {
    return this.httpClient.put(this.recipeApiUrl, recipe);
  }

  getRecipe(recipeId: number) {
    return this.httpClient.get<Recipe>(`${this.recipeApiUrl}/${recipeId}`);
  }

  getRecipes() {
    return this.httpClient.get<Recipe[]>(`${this.recipeApiUrl}/GetRecipes`);
  }

  canEditRecipe(recipeId: number) {
    return this.httpClient.get<boolean>(`${this.recipeApiUrl}/CanEditRecipe/${recipeId}`);
  }
}
