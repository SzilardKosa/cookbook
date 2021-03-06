import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CircleButtonComponent } from './circle-button/circle-button.component';
import { RecipeCardsComponent } from './recipe-cards/recipe-cards.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RecipeListviewComponent } from './recipe-listview/recipe-listview.component';
import { CategorySelectorComponent } from './category-selector/category-selector.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AdvertModalComponent } from './advert-modal/advert-modal.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';



@NgModule({
  declarations: [
    CircleButtonComponent,
    RecipeCardsComponent,
    RegisterComponent,
    LoginComponent,
    RecipeListviewComponent,
    CategorySelectorComponent,
    LoadingSpinnerComponent,
    AdvertModalComponent,
    RecipeCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    CircleButtonComponent,
    RecipeCardsComponent,
    RegisterComponent,
    LoginComponent,
    RecipeListviewComponent,
    CategorySelectorComponent,
    LoadingSpinnerComponent,
    AdvertModalComponent,
    RecipeCardComponent,
  ],
  entryComponents: [RegisterComponent, LoginComponent, AdvertModalComponent]
})
export class SharedModule { }
