import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../models/recipe';
import { Category } from '../models/filter';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesCollection: AngularFirestoreCollection<Recipe>;
  filter: Category;
  listState: number = 1;

  constructor(public afs: AngularFirestore, private storage: AngularFireStorage) {
    this.recipesCollection = this.afs.collection('recipes');

    this.filter = {
      courses: [],
      cuisines: [],
      occasions: [],
      specialDiets: []
    };
  }

  updateListState(state:number){
    this.listState = state;
  }

  getListState():number{
    return this.listState
  }

  updateFilter(filter: Category) {
    this.filter = filter;
  }

  getFilter():Category{
    return this.filter;
  }

  getRecipes(last?: string):Observable<Recipe[]>{
    const filtered = this.afs.collection('recipes', ref => {
      let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      Object.entries(this.filter).forEach(([key, value]) => {
        value.forEach(q=>{
          query = query.where(`categories.${key}.${q}`,'==', true);
        })
      });
      if(last){
        return query.orderBy(firestore.FieldPath.documentId()).limit(6).startAfter(last);
      }
      return query.orderBy(firestore.FieldPath.documentId()).limit(6);
    });
    return filtered.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Recipe;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
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
    const recipeDoc = this.afs.doc<Recipe>(`recipes/${id}`);
    return recipeDoc.valueChanges();
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