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



@NgModule({
  declarations: [
    CircleButtonComponent,
    RecipeCardsComponent,
    RegisterComponent,
    LoginComponent,
    RecipeListviewComponent,
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
  ],
  entryComponents: [RegisterComponent, LoginComponent]
})
export class SharedModule { }
