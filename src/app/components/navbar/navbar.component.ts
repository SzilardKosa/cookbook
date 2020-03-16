import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../models/login';
import { Register } from '../../models/register';


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

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onSubmitReg(){
    this.authService.register(this.regData);
    console.log("submitting reg");
  }

  onSubmitLogin(){
    this.authService.login(this.loginData);
    console.log("submitting login");
  }


}
