import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { FirebaseAuthService } from './firebase-auth.service';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {

  constructor(private router: Router, private auth: FirebaseAuthService) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let loggedIn: boolean;
    await this.auth.user.pipe(
      take(1)
    ).toPromise().then((data) => {
      loggedIn = data ? true : false;
    });
    if (state.url.indexOf('auth') !== -1) {
      if (loggedIn) {
        this.router.navigate(['/']);
        return false;
      } else {
        return true;
      }
    } else {
      if (loggedIn) {
        return true;
      } else {
        this.router.navigate(['/auth/login']);
        return true;
      }
    }
  }

}
