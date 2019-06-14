import { Component, OnInit, HostListener } from '@angular/core';
import { FirebaseAuthService } from '../../../core/service/firebase/firebase-auth.service';
import { PlatformLocation } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'app/core/service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  panelVisible: boolean;
  user: any;
  headerOptions: any;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    public firebaseAuth: FirebaseAuthService,
    private location: PlatformLocation,
    private http: HttpClient,
    private apiService: ApiService
  ) {
  }

  ngOnInit() {
    this.user = this.firebaseAuth.getUserData();
  }

  goBack() {
    this.location.back();
    this.apiService.ngUnsubscribe.next();
    this.apiService.ngUnsubscribe.complete();
  }

  signOut() {
    this.firebaseAuth.signOut();
  }

  togglePanel(e: boolean) {
    this.panelVisible = e;
  }
}
