import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-recipe-form',
  templateUrl: './add-recipe-form.component.html',
  styleUrls: ['./add-recipe-form.component.scss']
})
export class AddRecipeFormComponent implements OnInit {
  form: FormGroup;

  get ingredientsFormArray() {
    return this.form.get('ingredients') as FormArray;
  }

  get ingredients() {
    return this.ingredientsFormArray.controls;
  }

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      ingredients: new FormArray([])
    });
  }

  onAddIngredient(): void {
    var a = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required)
    });

    this.ingredientsFormArray.push(a);
  }

  onRemoveIngredient(index: number): void {
    this.ingredients.splice(index, 1);
  }

  onSubmit() {
    console.log(this.form);
  }
}
