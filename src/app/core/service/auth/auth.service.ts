import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ApiService, VERSION, ENDPOINT } from '../api/api.service';

@Injectable()
export class AuthService {

  logger = new Subject<Object>();
  referralRoute: string;

  constructor(
    private router: Router,
    private api: ApiService
  ) {
  }

  logout() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('uid');
    // localStorage.removeItem('client');
    this.redirectToLogin();
    this.logger.next(false);
  }

  setToken(data) {
    localStorage.setItem('access-token', data.accessToken);
    localStorage.setItem('uid', data.uid);
    this.logger.next(true);
    this.redirectToPrevStep();
  }

  postLogin(body: any) {
    this.api.get(['token.json'], {}).subscribe(
      (res: any) => {
        localStorage.setItem('access-token', res['access-token']);
        localStorage.setItem('uid', res['uid']);
        // localStorage.setItem('client', res['client']);
        this.logger.next(true);
        this.redirectToPrevStep();
      },
      (err) => {
        this.logger.next(err);
      });
  }

  checkLogin(body: any) {
    this.api.get([VERSION, ENDPOINT.checkLogin], {}).subscribe(
      (res: any) => {
        this.logger.next(true);
      },
      (err) => {
        this.logger.next(err);
      });
  }

  isAuthenticated() {
    const token = localStorage.getItem('access-token');
    let isAuthenticated: boolean;
    if (this.isTokenInvalid()) {
      localStorage.removeItem('access-token');
      isAuthenticated = false;
    } else {
      isAuthenticated = true;
    }
    return isAuthenticated;
  }

  getUserInfo() {
    const token = localStorage.getItem('access-token');
    // let userInfo = this.jwtHelper.decodeToken(token);
    return  {};
    //   this.jwtHelper.decodeToken(token),
    //   this.jwtHelper.getTokenExpirationDate(token),
    //   this.jwtHelper.isTokenExpired(token)
    // );
  }

  isTokenInvalid() {
    const token = localStorage.getItem('access-token');
    if (!token) {
      return true
    } else {
      // this.api.setHeaders(token);
      return false;
    }
  }

  /**
   * Helper method for set up referral route, enable useful redirect after login
   * @method setRoute
   * @param  {string} route Route as defined in app.routes, eg. /user/1
   */
  setRoute(route: string): void {
    this.referralRoute = route;
  }

  redirectToPrevStep() {
    const route = this.referralRoute ? this.referralRoute : '/';
    this.router.navigateByUrl(route);
  }

  redirectToLogin(current: string = '/') {
    // Store current url as referral and use latter for login redirection
    this.setRoute(current);
    window.scroll(0, 0);
    this.router.navigate(['/auth/login']);
  }



}
