import { SignupComponent } from './features/auth/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './features/auth/signin/signin.component';
import {
  redirectLoggedInTo,
  canActivate,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'chat',
  },
  {
    path: 'signin',
    ...canActivate(() => redirectLoggedInTo(['chat'])),
    component: SigninComponent,
  },
  {
    path: 'signup',
    ...canActivate(() => redirectLoggedInTo(['chat'])),
    component: SignupComponent,
  },
  {
    path: 'chat',
    ...canActivate(() => redirectUnauthorizedTo(['signin'])),
    loadChildren: () =>
      import('./features/chat/chat.module').then((m) => m.ChatModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
