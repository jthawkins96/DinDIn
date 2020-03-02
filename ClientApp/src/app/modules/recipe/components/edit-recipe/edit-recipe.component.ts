import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeClientService } from 'src/app/core/services/recipe-client.service';
import { switchMap } from 'rxjs/operators';
import { AlertifyService } from 'src/app/core/services/alertify.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit, OnDestroy {
  recipeIdSubscription: Subscription;
  recipe: Recipe;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private recipeClient: RecipeClientService,
    private alertifyService: AlertifyService
  ) {}

  ngOnInit() {
    this.recipeIdSubscription = this.route.params
      .pipe(switchMap(params => this.recipeClient.getRecipe(+params.id)))
      .subscribe(recipe => {
        this.recipe = recipe;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.recipeIdSubscription.unsubscribe();
  }

  onSubmit(form: FormGroup) {
    const formValues = form.value;
    const updatedRecipe: Recipe = {
      id: this.recipe.id,
      name: formValues.name,
      ingredients: form.value.ingredients
    };

    this.recipeClient.updateRecipe(updatedRecipe).subscribe(
      response => {
        this.alertifyService.success('Recipe was updated!');
      },
      error => {
        console.log(error);
        this.alertifyService.error('Unable to update recipe.');
      }
    );
  }
}
