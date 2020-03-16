import { Injectable } from '@angular/core';
import { User } from "../models/user";
import { Login } from "../models/login";
import { Register } from "../models/register";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn : boolean = false;
  userData: User;

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.auth.onAuthStateChanged(user => {
      if(user){
        this.loggedIn = true;
        console.log("logged in");
      } else {
        this.loggedIn = false;
        console.log("no user is signed in");
      }}
    )
  } 

  // register user with email&password
  register(regData: Register){
    this.afAuth.auth.createUserWithEmailAndPassword(regData.email, regData.password)
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }

  // log in user with emial&password
  login(loginData: Login){
    this.afAuth.auth.signInWithEmailAndPassword(loginData.email, loginData.password)
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }

  logout(){
    this.afAuth.auth.signOut()
    .then(response => console.log(response))
    .catch(error => console.log(error))
  }

}
