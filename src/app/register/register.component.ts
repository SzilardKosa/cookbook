import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Register } from '../models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regData: Register = {
    username: '',
    email: '',
    password: '',
    confPassword: ''
  };
  hideRegError: boolean = true;
  regError: string = '';

  constructor(public auth: AuthService,
              public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  onSubmitReg(){
    console.log("submitting reg");

    this.auth.register(this.regData)
    .then(credential => {
      console.log(credential);
      this.auth.createUserData(credential.user, this.regData);
      this.close();
    })
    .catch(error => {
      console.log(error.message);
      this.regError = error.message;
      this.hideRegError = false;
    });
  }

  resetRegError(){
    this.hideRegError = true;
    this.regError = '';
  }

  close(reason?:any){
    this.resetRegError();
    this.activeModal.dismiss(reason);
  }

}
