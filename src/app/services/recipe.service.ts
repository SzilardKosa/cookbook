import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Recipe } from '../models/recipe';
import { Category } from '../models/filter';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesCollection: AngularFirestoreCollection<Recipe>;
  recipeDoc: AngularFirestoreDocument<Recipe>;
  recipes$: Observable<Recipe[]>;
  filter$: BehaviorSubject<Category>;

  constructor(public afs: AngularFirestore, private storage: AngularFireStorage) {
    this.recipesCollection = this.afs.collection('recipes');

    this.filter$ = new BehaviorSubject({
      courses: [],
      cuisines: [],
      occasions: [],
      specialDiets: []
    });

    this.recipes$ = this.filter$.pipe(
      switchMap(categories =>
        this.afs.collection('recipes', ref => {
          let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
          categories.courses.forEach(q=>{
            query = query.where(`categories.courses.${q}`,'==', true);
          })
          categories.occasions.forEach(q=>{
            query = query.where(`categories.occasions.${q}`,'==', true);
          })
          categories.cuisines.forEach(q=>{
            query = query.where(`categories.cuisines.${q}`,'==', true);
          })
          categories.specialDiets.forEach(q=>{
            query = query.where(`categories.specialDiets.${q}`,'==', true);
          })
          return query.orderBy(firestore.FieldPath.documentId());//.startAfter('64u1U89L8mKq1rIifGyt');
        }).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Recipe;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        )
      )
    )

  }

  updateFilter(filter: Category) {
    this.filter$.next(filter);
  }

  getRecipes():Observable<Recipe[]>{
    return this.recipes$;
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