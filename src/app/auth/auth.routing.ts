import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthGuard } from '../core/service/auth/auth-guard';
import { FirebaseAuthGuard } from '../core/service/firebase/firebase-auth-guard';

export const authRoutes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [FirebaseAuthGuard],
    children: [
      {
        path: 'login',
        loadChildren: 'app/auth/login/login.module#LoginModule'
      }
    ]
  }
];
