import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { AuthGuard } from '../services/auth.guard';


const routes: Routes = [
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipe-detail/:id', component: RecipeDetailComponent },
  { path: 'add-recipe', component: AddRecipeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
