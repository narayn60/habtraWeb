import { Routes } from '@angular/router';
import {LoginComponent} from './features/login/login.component';
import {SignupComponent} from './features/sign-up/signup.component';
import {NavigationComponent} from './core/navigation/navigation.component';
import {HabitsComponent} from './features/habits/habits.component';

export const routes: Routes = [
  {
    path: '',
    component: NavigationComponent
  },
  {
    path: 'habits',
    component: HabitsComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: SignupComponent,
  }
];
