import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-circle-button',
  templateUrl: './circle-button.component.html',
  styleUrls: ['./circle-button.component.css']
})
export class CircleButtonComponent implements OnInit {
  @Input() iconType:string;
  @Input() recipeId:string;
  user: User;

  constructor( public auth: AuthService ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(): void {
    this.auth.user$.subscribe(user => this.user = user)
  }

  updateFavorites(recipeId:string) {
    if (this.user === null){
      alert("You have to log in to save favorite recipes!");
    } else {
      this.saveFavorites(recipeId);
    }
  }

  saveFavorites(recipeId:string) {
    if(typeof this.user.favorites === 'undefined'){
      this.user.favorites = [];
    }
    if(this.user.favorites.includes(recipeId)){
      this.user.favorites = this.user.favorites.filter(item => item !== recipeId );
    } else {
      this.user.favorites.push(recipeId);
    }
    console.log(this.user);

    this.auth.updateUser(this.user)
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }

  isFavorite(recipeId:string):boolean {
    if(this.user === null) return false;
    if(typeof this.user === 'undefined') return false;
    if(typeof this.user.favorites === 'undefined') return false;
    return this.user.favorites.includes(recipeId);
  }

}
