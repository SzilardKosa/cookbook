import { Component, OnInit } from '@angular/core';
// import { RecipeService } from '../../services/recipe.service';
// import { Observable } from 'rxjs';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  // recipes: Observable<any[]>;

  // constructor(public recipeService: RecipeService) {
  //   this.recipes = recipeService.getRecipes()
  // }

  ngOnInit() {
  }

}
