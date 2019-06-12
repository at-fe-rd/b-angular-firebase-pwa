import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../core/service/auth/auth.service';
import { FirebaseAuthService } from '../../core/service/firebase/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  canAction: boolean;
  hasError: boolean;
  errorMsgs: any;

  constructor(
    public firebaseAuth: FirebaseAuthService,
    private auth: AuthService,
    private router: Router
  ) {
    // this.canAction = true;
    // this.auth.logger.subscribe((data: any) => {
    //   this.errorMsgs = data;
    //   this.canAction = true;
    // })
  }

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.canAction = false;
    const body = {
      'userId': f.value.username,
      'password': f.value.password
    };
    this.auth.postLogin(body);
  }
}
