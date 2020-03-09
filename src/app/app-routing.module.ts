import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RecipeListComponent } from './components/recipes/recipe-list/recipe-list.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'recipes', component: RecipeListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
