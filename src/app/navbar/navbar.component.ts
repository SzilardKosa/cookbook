import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Login } from '../models/login';
import { Register } from '../models/register';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  hideRegError: boolean = true;
  regError: string = '';
  regData: Register = {
    username: '',
    email: '',
    password: '',
    confPassword: ''
  };
  
  hideLoginError: boolean = true;
  loginError: string = '';
  loginData: Login = {
    email: '',
    password: ''
  }

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }
  
  onSubmitReg(){
    console.log("submitting reg");

    this.auth.register(this.regData)
    .then(credential => {
      console.log(credential);
      this.auth.createUserData(credential.user, this.regData);
      this.closeReg();
    })
    .catch(error => {
      console.log(error.message);
      this.regError = error.message;
      this.hideRegError = false;
    });
  }

  @ViewChild('closeRegModal', {static: false}) closeRegModal: ElementRef;
  closeReg(){
    this.closeRegModal.nativeElement.click();
    this.resetRegError();
  }

  resetRegError(){
    this.hideRegError = true;
    this.regError = '';
  }

  onSubmitLogin(){
    console.log("submitting login");

    this.auth.login(this.loginData)
    .then(response => {
      console.log(response)
      this.closeLogin();
    })
    .catch(error => {
      console.log(error.message);
      this.loginError = error.message;
      this.hideLoginError = false;
    });
  }

  @ViewChild('closeLoginModal', {static: false}) closeLoginModal: ElementRef;
  closeLogin(){
    this.closeLoginModal.nativeElement.click();
    this.resetLoginError();
  }
  
  resetLoginError(){
    this.hideLoginError = true;
    this.loginError = '';
  }

}
