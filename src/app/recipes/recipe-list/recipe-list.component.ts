import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';
import { Category } from '../../models/filter';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @ViewChild('searchWrapper', {static: false}) searchWrapper: ElementRef;
  recipes: Recipe[];
  listState: number;
  sidebarDisplayed: boolean = false;
  noResult: boolean = false;
  endOfList: boolean = false;
  filter: Category = {
    courses: [],
    cuisines: [],
    occasions: [],
    specialDiets: []
  };

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.filter = this.recipeService.getFilter();
    if(
      this.filter.courses.length > 0 ||
      this.filter.cuisines.length > 0 ||
      this.filter.occasions.length > 0 ||
      this.filter.specialDiets.length > 0
    ){
      this.showSidebar();
    }
    this.listState = this.recipeService.getListState();
    this.getFirstRecipes();
  }

  getFirstRecipes(){
    this.endOfList = false;
    this.recipes = [];
    this.recipeService.getRecipes()
    .pipe(take(2)) // cache miatt
    .subscribe( recipes => {
      this.recipes = recipes;
      if(recipes.length > 0){
        this.noResult = false;
      } else {
        this.noResult = true;
      }
      if(recipes.length < 6){
        this.endOfList = true;
      }
    })
  }

  getNextRecipes(){
    if (this.noResult || this.endOfList) return;
    this.recipeService.getRecipes(this.recipes[this.recipes.length - 1].id)
    .pipe(take(2)) // cache miatt
    .subscribe( recipes => {
      this.recipes = this.recipes.concat(recipes);
      console.log(recipes);
      if(recipes.length < 6){
        this.endOfList = true;
      }
    })
  }

  onScroll(){
    console.log('scroll');
    this.getNextRecipes();
  }

  updateFilter(){
    console.log(this.filter);
    this.recipeService.updateFilter(this.filter);
    this.getFirstRecipes();
  }

  showSidebar() {
    this.sidebarDisplayed = true;
  }

  toggleSidebar() {
    this.sidebarDisplayed = !this.sidebarDisplayed;
  }
  
  hideSidebar() {
    this.sidebarDisplayed = false;
  }

  updateListState(){
    this.recipeService.updateListState(this.listState);
  }

}
