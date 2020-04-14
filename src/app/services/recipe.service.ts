import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../models/recipe';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesCollection: AngularFirestoreCollection<Recipe>;
  recipeDoc: AngularFirestoreDocument<Recipe>;
  recipes: Observable<Recipe[]>;

  constructor(public afs: AngularFirestore, private storage: AngularFireStorage) {
    this.recipesCollection = this.afs.collection('recipes');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.recipes = this.recipesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Recipe;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getRecipes():Observable<Recipe[]>{
    return this.recipes;
  }

  getFavorites(ids: string[]){
    // The in operator max 10 ids can query!!
    const favorites = this.afs.collection('recipes', ref => ref.where(firestore.FieldPath.documentId(), 'in', ids));
    return favorites.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Recipe;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getRecipe(id: string):Observable<Recipe>{
    this.recipeDoc = this.afs.doc<Recipe>(`recipes/${id}`);
    return this.recipeDoc.valueChanges();
  }

  getRecipeId(){
    return this.recipesCollection.ref.doc().id;
  }

  uploadPhoto(photo:File, filePath: string){
    return this.storage.upload(filePath, photo);
  }

  addRecipe(recipe:Recipe, recipeId: string){
    return this.recipesCollection.doc(recipeId).set(recipe);
  }

  updateRecipe(id:string, recipe:Recipe) {
    const recipeDoc = this.afs.doc<Recipe>(`recipes/${id}`);
    return recipeDoc.update(recipe);
  }
}