import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Login } from '../models/login';
import { Register } from '../models/register';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  regData: Register = {
    username: '',
    email: '',
    password: '',
    confPassword: ''
  };

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
    })
    .catch(error => {
      console.log(error)
    });
  }

  onSubmitLogin(){
    console.log("submitting login");

    this.auth.login(this.loginData)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    });
  }


}
