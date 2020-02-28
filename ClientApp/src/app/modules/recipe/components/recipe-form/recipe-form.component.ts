import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  form: FormGroup;
  @Output() formSubmitted = new EventEmitter<FormGroup>();
  @Input() recipe;
  submitButtonText: string;

  get ingredientsFormArray() {
    return this.form.get('ingredients') as FormArray;
  }

  get ingredients() {
    return this.ingredientsFormArray.controls;
  }

  constructor() {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    if (this.recipe) {
      const initialIngredients = this.recipe.ingredients.map(ingredient => {
        return new FormGroup({
          id: new FormControl(ingredient.id),
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(ingredient.amount, Validators.required)
        });
      });

      this.form = new FormGroup({
        name: new FormControl(this.recipe.name, [Validators.required]),
        ingredients: new FormArray(initialIngredients)
      });

      this.submitButtonText = 'Update Recipe';
    } else {
      this.form = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        ingredients: new FormArray([])
      });

      this.submitButtonText = 'Add Recipe';
    }
  }

  onAddIngredient(): void {
    var a = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required)
    });

    this.ingredientsFormArray.push(a);
  }

  onRemoveIngredient(index: number): void {
    this.ingredientsFormArray.removeAt(index);
  }

  onSubmit() {
    this.formSubmitted.emit(this.form);
  }
}
