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

}
