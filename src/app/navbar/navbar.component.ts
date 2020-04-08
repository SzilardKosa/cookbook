import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isCollapsed = true;

  constructor(public auth: AuthService,
              private modalService: NgbModal) { }

  ngOnInit() {
  }

  openLogin() {
    const loginModalRef = this.modalService.open(LoginComponent,{backdrop: 'static'});
  }

  openReg() {
    const regModalRef = this.modalService.open(RegisterComponent,{backdrop: 'static'});
  }

}
