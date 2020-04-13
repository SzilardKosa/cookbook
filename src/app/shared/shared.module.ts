import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CircleButtonComponent } from './circle-button/circle-button.component';
import { RecipeCardsComponent } from './recipe-cards/recipe-cards.component';



@NgModule({
  declarations: [
    CircleButtonComponent,
    RecipeCardsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    CircleButtonComponent,
    RecipeCardsComponent,
  ]
})
export class SharedModule { }
