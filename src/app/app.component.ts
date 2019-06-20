import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { I18nService } from './core/service/i18n/i18n.service';
import { filter } from 'rxjs/operators';
import { AuthService } from './core/service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FirebaseMessagingService } from './core/service/firebase/firebase-messaging.service';


// Define list language for app
I18nService.SUPPORTED_LANGUAGES = [
  { code: 'ja', title: 'Japanese' },
  { code: 'en', title: 'English' },
  { code: 'vi', title: 'Vietnamese' }
];

// Set type active for current language
I18nService.ACTIVE_TYPE = 'selected';

declare var FastClick;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit, AfterViewInit {
  title: 'app';
  selectedFile: null;
  noBackHeader: any = [];
  deviceInfo: any;
  isHeaderShow: Boolean = true;
  message: any;

  constructor(
    public i18n: I18nService,
    private auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private msgService: FirebaseMessagingService
  ) {
    this.noBackHeader = [
      /\/home/,
      /\/auth\/login/
    ];
  }

  ngOnInit() {
    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
  }

  ngAfterViewInit() {
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
          FastClick.attach(document.body);
      }, false);
    }
  }

}
