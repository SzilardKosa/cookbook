import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';
import { Recipe } from '../../models/recipe';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  user: User;
  recipeForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    serves: [1, Validators.required],
    time: [15, Validators.required],
    price: ['Average', Validators.required],
    difficulty: ['Medium', Validators.required],
    ingredients: this.fb.array([
      this.fb.group({
        quantity: [0, Validators.required],
        unit: [''],
        name: ['', Validators.required],
      })
    ]),
    steps: this.fb.array([
      this.fb.group({
        description: ['', Validators.required],
        time: [0, Validators.required],
        active: [true, Validators.required],
      })
    ]),
    photoURL: ['', Validators.required],
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

  constructor(private fb: FormBuilder,
              public recipeService: RecipeService,
              public auth: AuthService,
              ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(): void {
    this.auth.user$.subscribe(user => this.user = user)
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get steps() {
    return this.recipeForm.get('steps') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.group({
      quantity: [0],
      unit: [''],
      name: [''],
    }));
  }

  removeIngredient(i:number) {
    this.ingredients.removeAt(i);
  }

  addStep() {
    this.steps.push(this.fb.group({
      description: [''],
      time: [0],
      active: [true],
    }));
  }

  removeStep(i:number) {
    this.steps.removeAt(i);
  }


  onSubmit() {   
    const newRecipe: Recipe = {
      name: this.recipeForm.value.name,
      description: this.recipeForm.value.description,
      serves: this.recipeForm.value.serves,
      time: this.recipeForm.value.time,
      price: this.recipeForm.value.price,
      difficulty: this.recipeForm.value.difficulty,
      ingredients: this.recipeForm.value.ingredients,
      steps: this.recipeForm.value.steps,
      date: new Date(),
      uid: this.user.uid,
      photoURL: this.recipeForm.value.photoURL,
    };

    console.log(newRecipe);

    this.recipeService.addRecipe(newRecipe).then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    });
  }

}
