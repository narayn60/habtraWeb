import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

interface UserRegistration {
  username: string | null,
  password: string | null,
  email: string | null
}

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private http: HttpClient = inject(HttpClient);

  register(credentials: Partial<UserRegistration>) {
    return this.http.post<UserRegistration>(environment.apiUrl + '/api/users', credentials).subscribe(user =>
      console.log(user)
    );
  }
}
