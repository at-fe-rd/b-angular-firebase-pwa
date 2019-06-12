import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (state.url.indexOf('auth') !== -1) {
      if (this.auth.isAuthenticated()) {
        this.auth.redirectToPrevStep();
        return false;
      } else {
        return true;
      }
    } else {
      if (this.auth.isAuthenticated()) {
        return true;
      } else {
        this.auth.redirectToLogin(state.url);
        return false;
      }
    }
  }

  // canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
  //   return this.authentication.user.pipe(
  //     take(1),
  //     map(user => !!user),
  //     tap((loggedIn: any) => {
  //       if (state.url.indexOf('auth') !== -1) {
  //         if (loggedIn) {
  //           this.auth.redirectToPrevStep();
  //           return false;
  //         } else {
  //           return true;
  //         }
  //       } else {
  //         if (loggedIn) {
  //           return true;
  //         } else {
  //           this.auth.redirectToLogin('/auth/login');
  //           return false;
  //         }
  //       }
  //     })
  //   );
  // }

}
