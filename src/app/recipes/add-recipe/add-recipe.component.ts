import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  recipeForm = this.fb.group({
    name: [''],
    description: [''],
    serves: ['1'],
    time: ['15'],
    price: ['Average'],
    difficulty: ['Medium'],
    ingredients: this.fb.array([
      this.fb.group({
        quantity: [''],
        unit: [''],
        name: [''],
      })
    ]),
    steps: this.fb.array([
      this.fb.group({
        description: [''],
        time: [''],
        active: ['true'],
      })
    ]),
    // categories: this.fb.group({
    //   course: this.fb.array([
    //     this.fb.control('')
    //   ]),
    //   cuisine: this.fb.array([
    //     this.fb.control('')
    //   ]),
    //   occasion: this.fb.array([
    //     this.fb.control('')
    //   ]),
    //   specialDiets: this.fb.array([
    //     this.fb.control('')
    //   ])
    // }),
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get steps() {
    return this.recipeForm.get('steps') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.group({
      name: [''],
      quantity: [''],
      unit: [''],
    }));
  }

  removeIngredient(i:number) {
    this.ingredients.removeAt(i);
  }

  addStep() {
    this.steps.push(this.fb.group({
      description: [''],
      active: ['true'],
      time: [''],
    }));
  }

  removeStep(i:number) {
    this.steps.removeAt(i);
  }


  onSubmit() {
    console.log(this.recipeForm.value);
  }

}
