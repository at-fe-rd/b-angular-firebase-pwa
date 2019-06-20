import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '../service/auth/auth.service';
import { AuthGuard } from '../service/auth/auth-guard';
import { TokenInterceptorService } from '../service/auth/token-interceptor.service';
import { I18N_PROVIDERS } from '../service/i18n/i18n.service';
import { API_PROVIDERS } from '../service/api/api.service';
import { FirebaseAuthService } from '../service/firebase/firebase-auth.service';
import { FirebaseAuthGuard } from '../service/firebase/firebase-auth-guard';
import { FirebaseMessagingService } from '../service/firebase/firebase-messaging.service';


const AUTH_PROVIDERS = [
  AuthService,
  AuthGuard,
  FirebaseAuthService,
  FirebaseAuthGuard
];

@NgModule({
  imports: [],
  declarations: [],
  exports: []
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AUTH_PROVIDERS,
        I18N_PROVIDERS,
        API_PROVIDERS,
        FirebaseMessagingService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true
        }
      ]
    };
  }

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
