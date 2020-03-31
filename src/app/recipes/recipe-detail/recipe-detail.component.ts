import { Component, OnInit, Renderer2 } from '@angular/core';
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
  currentServes: number;
  recipe$: Observable<Recipe>;
  user$: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private afs: AngularFirestore,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.recipe$ = this.recipeService.getRecipe(id);
    this.recipe$.subscribe(recipe => {
      this.currentServes = recipe.serves;
    });
    this.user$ = this.recipe$.pipe(
      switchMap(recipe => {
        return this.afs.doc<User>(`users/${recipe.uid}`).valueChanges();
      })
    );
  }

  toggleClass(event: any, className: string) {
    const hasClass = event.currentTarget.classList.contains(className);
    console.log("toggle "+className);
  
    if(hasClass) {
      this.renderer.removeClass(event.currentTarget, className);
    } else {
      this.renderer.addClass(event.currentTarget, className);
    }
  }

}
