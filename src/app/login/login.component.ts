import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Login } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData: Login = {
    email: '',
    password: ''
  }
  hideLoginError: boolean = true;
  loginError: string = '';

  constructor(public auth: AuthService,
              public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onSubmitLogin(){
    console.log("submitting login");

    this.auth.login(this.loginData)
    .then(response => {
      console.log(response)
      this.close();
    })
    .catch(error => {
      console.log(error.message);
      this.loginError = error.message;
      this.hideLoginError = false;
    });
  }
  
  resetLoginError(){
    this.hideLoginError = true;
    this.loginError = '';
  }

  close(reason?:any){
    this.resetLoginError();
    this.activeModal.dismiss(reason);
  }

}
