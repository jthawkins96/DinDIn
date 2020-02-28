import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {
  form: FormGroup;
  @Output() formSubmitted = new EventEmitter<FormGroup>();

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
    this.ingredientsFormArray.removeAt(index);
  }

  onSubmit() {
    this.formSubmitted.emit(this.form);
  }
}

