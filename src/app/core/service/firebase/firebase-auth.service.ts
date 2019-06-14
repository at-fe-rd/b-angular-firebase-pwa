
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}

@Injectable({
  providedIn: 'root'
})

export class FirebaseAuthService {
  user: Observable<any>;

  constructor(private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore, private authService: AuthService) {
    this.user = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }));
    // this.afAuth.auth.signOut();
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then((credential: any) => {
      this.setUserData(credential.user);
      this.updateUserData(credential.user).then((data) => {
        // console.log(data);
        this.router.navigate(['/']);
      }).catch((error) => {
        // console.log('update error', error);
      });
    }).catch((error) => {
      // console.log('signup error', error);
    });
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
    };
    return userRef.set(data, { merge: true });
  }

  getToken() {
    return localStorage.getItem('uid');
  }

  getUserData() {
    return JSON.parse(localStorage.getItem('user'));
  }

  setUserData(data) {
    localStorage.setItem('uid', data.uid);
    localStorage.setItem('user', JSON.stringify(data));
  }

  removeToken() {
    localStorage.removeItem('uid');
    localStorage.removeItem('user');
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/auth/login']);
    }).catch(() => {
      // console.log('error');
    });
  }
}
