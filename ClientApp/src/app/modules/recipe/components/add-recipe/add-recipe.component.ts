import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { RecipeClientService } from 'src/app/core/services/recipe-client.service';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { AlertifyService } from 'src/app/core/services/alertify.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  constructor(private recipeClient: RecipeClientService, private alertifyService: AlertifyService) {}

  ngOnInit() {}

  onSubmit(form: FormGroup) {
    const formValues = form.value;
    const newRecipe: Recipe = {
      name: formValues.name,
      ingredients: form.value.ingredients
    };
    this.recipeClient.addRecipe(newRecipe).subscribe(response => {
      this.alertifyService.success("Recipe was added!");
      form.reset();
      (form.controls.ingredients as FormArray).clear();
    }, error => {
      console.log(error);
      this.alertifyService.error("Unable to add recipe.")
    });
  }
}
