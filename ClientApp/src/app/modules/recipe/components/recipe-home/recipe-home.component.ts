import { Component, OnInit } from '@angular/core';
import { RecipeClientService } from 'src/app/core/services/recipe-client.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { RecipeData } from 'src/app/shared/models/recipe-data.model';
import { AlertifyService } from 'src/app/core/services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-home',
  templateUrl: './recipe-home.component.html',
  styleUrls: ['./recipe-home.component.scss']
})
export class RecipeHomeComponent implements OnInit {
  recipeData: RecipeData[] = [];
  columns = [{ prop: 'id' }, { name: 'Name' }, { name: 'Ingredients' }, { prop: '' }];
  isLoading: boolean = true;

  constructor(
    private recipeClient: RecipeClientService,
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const userId = this.authService.decodedToken.nameid;
    this.recipeClient.getRecipes(userId).subscribe(
      recipes => {
        const recipeData = recipes.map(recipe => {
          return {
            id: recipe.id,
            name: recipe.name,
            ingredients: recipe.ingredients.map(ingredient => ingredient.name).sort().join(','),
            edit: '<i class="fas fa-edit"></i>'
          };
        });
        this.recipeData = recipeData;
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.alertifyService.error('There was a problem loading your recipes.');
      }
    );
  }

  onAddRecipe() {
    this.router.navigate(['add-recipe'], { relativeTo: this.route })
  }

  onEdit(id: number) {
    this.router.navigate([`edit-recipe/${id}`], { relativeTo: this.route })
  }
}
