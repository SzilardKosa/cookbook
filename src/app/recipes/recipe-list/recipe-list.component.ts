import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';
import { Category } from '../../models/filter';

enum ListState {Grid, List}

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @ViewChild('searchWrapper', {static: false}) searchWrapper: ElementRef;
  recipes: Recipe[];
  listState: ListState = ListState.Grid;
  filter: Category = {
    courses: [],
    cuisines: [],
    occasions: [],
    specialDiets: []
  };

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.getRecipes().subscribe( recipes => {
      console.log(recipes);
      this.recipes = recipes;
    })
  }

  updateFilter(){
    console.log(this.filter);
    this.recipeService.updateFilter(this.filter);
  }

  toggleSidebar() {
    this.searchWrapper.nativeElement.classList.toggle('sidebarDisplayed');
  }
  
  hideSidebar() {
    this.searchWrapper.nativeElement.classList.remove('sidebarDisplayed');
  }

  toggleListGrid(){
    console.log(this.listState);
  }

}
