import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

import { RecipeService } from '../../services/recipe.service';
import { AuthService } from '../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Recipe } from '../../models/recipe';
import { User } from '../../models/user';
import { ClickEvent } from 'angular-star-rating/angular-star-rating';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe$: Observable<Recipe>;
  recipeID: string;
  currentRecipe: Recipe;
  user$: Observable<User>;
  private currentUser: User;
  ratingLabel:string = "0 (0)";
  myRatingControl = new FormControl('');
  
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private afs: AngularFirestore,
    private renderer: Renderer2,
    public auth: AuthService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.recipeID = this.route.snapshot.paramMap.get('id');
    this.recipe$ = this.recipeService.getRecipe(this.recipeID);
    this.recipe$.subscribe(recipe => {
      this.currentRecipe = recipe;
      if(typeof this.currentRecipe.ratings !== 'undefined') this.updateStars();
    });
    this.user$ = this.recipe$.pipe(
      switchMap(recipe => {
        return this.afs.doc<User>(`users/${recipe.uid}`).valueChanges();
      })
    );
    this.getProfile();
  }

  getProfile(): void {
    this.auth.user$.subscribe(user => this.currentUser = user)
  }

  // toggle checked out class
  toggleClass(event: any, className: string) {
    const hasClass = event.currentTarget.classList.contains(className);
    console.log("toggle "+className);
  
    if(hasClass) {
      this.renderer.removeClass(event.currentTarget, className);
    } else {
      this.renderer.addClass(event.currentTarget, className);
    }
  }

  addRating($event: ClickEvent) {
    if (this.currentUser === null){
      alert("You have to log in to rate recipes!");
    } else {
      this.askConfirmation($event.rating);
    }
    this.updateStars();
  };

  askConfirmation(score:number) {
    const modalRef = this.modalService.open(ConfirmModalComponent, {backdrop: 'static'});
    modalRef.componentInstance.user = this.currentUser;
    modalRef.componentInstance.rating = score;
    modalRef.result.then((result) =>{
      console.log("OK");
      this.saveRating(score);
    }, (reason) => {
      console.log("Cancel");
    })
  }

  saveRating(score:number) {
    if(typeof this.currentRecipe.ratings === 'undefined'){
      this.currentRecipe.ratings = new Object();
    }
    this.currentRecipe.ratings[this.currentUser.uid] = score;
    console.log(this.currentRecipe);

    this.recipeService.updateRecipe(this.recipeID, this.currentRecipe)
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }

  updateStars() {
    if(typeof this.currentRecipe.ratings === 'undefined'){
      this.myRatingControl.setValue(0);
      this.ratingLabel = "0 (0)";
      return;
    }
    const ratings = this.currentRecipe.ratings;
    const numberOfRatings = Object.keys(ratings).length;
    let sumOfRatings = 0;
    
    for (let key in ratings) {
      sumOfRatings += ratings[key];
    }
    const score = sumOfRatings/numberOfRatings;
    this.myRatingControl.setValue(score);
    this.ratingLabel = `${score} (${numberOfRatings})`;
  }

}
