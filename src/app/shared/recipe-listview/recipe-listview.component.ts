import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-recipe-listview',
  templateUrl: './recipe-listview.component.html',
  styleUrls: ['./recipe-listview.component.css']
})
export class RecipeListviewComponent implements OnInit {
  @Input() recipes: Recipe[];

  constructor() { }

  ngOnInit() {
  }

}
