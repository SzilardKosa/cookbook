import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-recipe-cards',
  templateUrl: './recipe-cards.component.html',
  styleUrls: ['./recipe-cards.component.css']
})
export class RecipeCardsComponent implements OnInit {
  @Input() recipes: Recipe[];

  constructor() { }

  ngOnInit() {
  }

}
