
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

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

export class AuthFirebaseService {
  user: Observable<any>;

  constructor(private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore, private authService: AuthService) {
    this.user = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }));
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then((credential: any) => {
      this.authService.setToken({
        accessToken: credential.credential.accessToken,
        uid: credential.user.uid
      });
      //   this.updateUserData(credential.user).then((data) => {
      //     console.log(data);
      //   }).catch((error) => {
      //     console.log('error', error);
      //   });
      //   console.log('success', credential);
      //   this.router.navigate(['/']);
    }).catch((error) => {
      console.log('error', error);
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

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    }).catch(() => {
      console.log('error');
    });
  }
}
