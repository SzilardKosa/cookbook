import { Component } from '@angular/core';
import { RecipeService } from './services/recipe.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  recipes: Observable<any[]>;

  constructor(public recipeService: RecipeService) {
    recipeService.getRecipes().subscribe(items => {
      console.log(items);
    })
  }
}
