import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes: Observable<any[]>;

  constructor(public db: AngularFirestore) {
    this.recipes = db.collection('recipes').valueChanges();
  }

  getRecipes(){
    return this.recipes;
  }
}