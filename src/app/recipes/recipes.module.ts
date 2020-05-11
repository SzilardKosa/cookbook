import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { RecipeListComponent } from './recipe-list/recipe-list.component';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';

import { StarRatingModule } from 'angular-star-rating';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { UploadSuccessModalComponent } from './upload-success-modal/upload-success-modal.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    RecipesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StarRatingModule.forRoot(),
    SharedModule,
    NgbModule
  ],
  declarations: [
    RecipeListComponent,
    RecipeDetailComponent,
    AddRecipeComponent,
    ConfirmModalComponent,
    UploadSuccessModalComponent
  ],
  entryComponents: [ConfirmModalComponent, UploadSuccessModalComponent]
})
export class RecipesModule { }
