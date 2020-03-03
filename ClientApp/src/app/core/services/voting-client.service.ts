import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VotingClientService {
  votingApiUrl: string = `${environment.apiUrl}/voting`;

  constructor(private http: HttpClient) { }

  setRecipesForVoting(groupId: number, recipes: Recipe[]) {
    console.log(recipes)
    return this.http.post(`${this.votingApiUrl}/${groupId}`, recipes);
  }
}
