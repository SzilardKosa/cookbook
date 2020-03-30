import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../models/user';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe$: Observable<Recipe>;
  user$: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private afs: AngularFirestore,
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.recipe$ = this.recipeService.getRecipe(id);
    this.user$ = this.recipe$.pipe(
      switchMap(recipe => {
        return this.afs.doc<User>(`users/${recipe.uid}`).valueChanges();
      })
    );
  }

}
