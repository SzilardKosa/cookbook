import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../shared/login/login.component';
import { RegisterComponent } from '../../shared/register/register.component';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { categories } from '../../models/categories';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public searchText: any;
  public isCollapsed = true;

  constructor(
    public auth: AuthService,
    private modalService: NgbModal,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  formatter = (category: any) => category.name;

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term === '' ? []
      : categories.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  )

  onSearch(){
    if(this.searchText){
      let filter = {
        courses: [],
        cuisines: [],
        occasions: [],
        specialDiets: []
      };
      filter[this.searchText.type] = [this.searchText.name];
      console.log(filter);
      this.recipeService.updateFilter(filter);

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/recipes']);
      this.collapseNav();
      this.searchText = {};
    }
  }

  openLogin() {
    const loginModalRef = this.modalService.open(LoginComponent,{backdrop: 'static'});
    this.collapseNav();
  }

  openReg() {
    const regModalRef = this.modalService.open(RegisterComponent,{backdrop: 'static'});
    this.collapseNav();
  }

  collapseNav(){
    this.isCollapsed = true;
  }

}
