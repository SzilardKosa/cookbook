import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites$: Observable<Recipe[]>;

  constructor(
    private recipeService: RecipeService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.favorites$ = this.auth.user$.pipe(
      switchMap(user => {
        if(typeof user.favorites === 'undefined')
        {
          return of(null);
        } else {
          return this.recipeService.getFavorites(user.favorites);
        }
      })
    );
  }

}
