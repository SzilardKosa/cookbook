import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdvertModalComponent } from '../advert-modal/advert-modal.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-circle-button',
  templateUrl: './circle-button.component.html',
  styleUrls: ['./circle-button.component.css']
})
export class CircleButtonComponent implements OnInit {
  @Input() iconType:string;
  @Input() recipeId:string;
  user: User;

  constructor( 
    public auth: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(): void {
    this.auth.user$.subscribe(user => this.user = user)
  }

  updateFavorites(recipeId:string) {
    if (this.user === null){
      this.showAdvert();
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

  showAdvert(){
    this.modalService.open(AdvertModalComponent, {backdrop: 'static'}).result.then((result) =>{
      if(result === 'register'){
        this.openReg();
      } else if(result === 'login'){
        this.openLogin();
      }
    }, (reason) => {
      console.log('Cancel');
    })
  }

  openLogin() {
    this.modalService.open(LoginComponent,{backdrop: 'static'});
  }

  openReg() {
    this.modalService.open(RegisterComponent,{backdrop: 'static'});
  }

}
