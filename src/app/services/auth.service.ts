import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from "../models/user";
import { Login } from "../models/login";
import { Register } from "../models/register";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;
  
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  register(regData: Register) {
    return this.afAuth.auth.createUserWithEmailAndPassword(regData.email, regData.password);
  }
  
  async createUserData(user, regData: Register) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: regData.username,
      photoURL: user.photoURL,
    }
    
    await userRef.set(data);
  }

  // log in user with emial&password
  login(loginData: Login){
    return this.afAuth.auth.signInWithEmailAndPassword(loginData.email, loginData.password)
  }

  async logout() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  updateUser(user:User) {
    const userDoc = this.afs.doc<User>(`users/${user.uid}`);
    return userDoc.update(user);
  }

}
