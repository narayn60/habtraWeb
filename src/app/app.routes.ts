import { Routes } from '@angular/router';
import {LoginComponent} from './features/login/login.component';
import {SignupComponent} from './features/sign-up/signup.component';
import {NavigationComponent} from './shared/components/navigation/navigation.component';
import {HabitsComponent} from './features/habits/habits.component';
import {CalendarComponent} from './features/calendar/calendar.component';
import {PageNotFoundComponent} from './features/page-not-found/page-not-found.component';

export const routes: Routes = [
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
  },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
