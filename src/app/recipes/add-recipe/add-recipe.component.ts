import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';
import { Recipe } from '../../models/recipe';
import { User } from 'src/app/models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadSuccessModalComponent } from '../upload-success-modal/upload-success-modal.component';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  selectedCourses: string[] = [];
  selectedOccasions: string[] = [];
  selectedCuisines: string[] = [];
  selectedSpecials: string[] = [];

  user: User;
  photo: File;
  uploadPercent: Observable<number>;
  imagePreview: string | ArrayBuffer = "https://bulma.io/images/placeholders/640x320.png";
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
    ])
  });

  constructor(
    private fb: FormBuilder,
    public recipeService: RecipeService,
    public auth: AuthService,
    private modalService: NgbModal
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

  changeFile(event: any) {
    const target = event.target;
    const file = target.files[0];
    if (file) {
      const maxAllowedSize = 5 * 1024 * 1024; // max 5MB
      if (file.size > maxAllowedSize){
        alert("File is too big");
        target.value = "";
        return;
      }

      this.photo = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = event => {
        this.imagePreview = reader.result;
      };
    }
  }

  onSubmit() {
    if(!this.photo){
      return alert('Please upload a photo!');
    }
    const recipeId = this.recipeService.getRecipeId();
    console.log(recipeId);
    console.log(this.photo);
    this.uploadPhoto(recipeId);
  }

  uploadPhoto(recipeId: string) {
    const task = this.recipeService.uploadPhoto(this.photo, `recipes/${recipeId}/${this.photo.name}`);
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task
    .then(response => {
      return response.ref.getDownloadURL();
    })
    .then( url => {
      console.log(url);
      this.uploadRecipe(recipeId, url);
    })
    .catch(error => {
      console.log("catch");
      console.log(error)
    });
  }

  uploadRecipe(recipeId: string, photoURL: string){
    let newRecipe: Recipe = this.recipeForm.value;
    newRecipe.date = new Date();
    newRecipe.uid = this.user.uid,
    newRecipe.photoURL = photoURL;
    newRecipe.categories =  {
      courses: this.selectedCourses.reduce( (acc, current) => {acc[current] = true; return acc;}, {}),
      occasions: this.selectedOccasions.reduce( (acc, current) => {acc[current] = true; return acc;}, {}),
      cuisines: this.selectedCuisines.reduce( (acc, current) => {acc[current] = true; return acc;}, {}),
      specialDiets: this.selectedSpecials.reduce( (acc, current) => {acc[current] = true; return acc;}, {})
    };

    console.log(newRecipe);

    this.recipeService.addRecipe(newRecipe, recipeId)
    .then(response => {
      console.log(response);
      this.showSuccess();
    })
    .catch(error => {
      console.log(error)
    });
  }

  showSuccess(){
    this.modalService.open(UploadSuccessModalComponent, {backdrop: 'static'}).result.then((result) =>{
      console.log("OK");
      this.clearForm();
    }, (reason) => {
      console.log("Cancel");
    })
  }

  clearForm(){
    this.photo = null;
    this.imagePreview = "https://bulma.io/images/placeholders/640x320.png";
    this.recipeForm.patchValue({
      name: '',
      description: '',
      serves: 1,
      time: 15,
      price: 'Average',
      difficulty: 'Medium'
    });
    this.ingredients.clear();
    this.addIngredient();
    this.steps.clear();
    this.addStep();
    this.selectedCourses = [];
    this.selectedCuisines = [];
    this.selectedOccasions = [];
    this.selectedSpecials = [];
  }
}
