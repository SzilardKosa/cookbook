import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RecipeListComponent } from './recipe-list/recipe-list.component';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';

import { StarRatingModule } from 'angular-star-rating';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';


@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailComponent,
    AddRecipeComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StarRatingModule.forRoot()
  ],
  entryComponents: [ConfirmModalComponent]
})
export class RecipesModule { }
