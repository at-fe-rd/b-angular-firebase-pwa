import { Routes } from '@angular/router';
import { FeatureComponent } from './feature.component';
import { AuthGuard } from '../core/service/auth/auth-guard';
import { FirebaseAuthGuard } from '../core/service/firebase/firebase-auth-guard';


// export const featureRoutes: Routes = [
//   {
//     path: '',
//     redirectTo: 'home',
//     pathMatch: 'full',
//     canActivate: [FirebaseAuthGuard]
//   },
//   {
//     path: '',
//     component: FeatureComponent,
//     canActivate: [FirebaseAuthGuard]
//   }
// ];

export const featureRoutes: Routes = [
  {
    path: '',
    canActivate: [FirebaseAuthGuard],
    loadChildren: 'app/features/feature.module#FeatureModule'
  }
];
