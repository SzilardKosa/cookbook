import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from 'src/app/shared/register/register.component';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  @ViewChild('carousel', {static: false}) carousel: ElementRef;
  cellCount:number = 5;
  selectedIndex:number = 0;
  topRecipes$:  Observable<Recipe[]>;

  constructor(
    private modalService: NgbModal,
    private recipeService: RecipeService,
  ) { }

  ngOnInit() {
    this.topRecipes$ = this.recipeService.getTop5();
  }

  openReg() {
    this.modalService.open(RegisterComponent,{backdrop: 'static'});
  }

  rotateCarousel() {
    let angle = this.selectedIndex / this.cellCount * -360;
    this.carousel.nativeElement.style.transform = 'translateZ(-242px) rotateY(' + angle + 'deg)';
  }

  prev(){
    this.selectedIndex--;
    this.rotateCarousel();
  }
  next(){
    this.selectedIndex++;
    this.rotateCarousel();
  }


}
