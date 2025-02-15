import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface UserRegistration {
  username: string | null,
  password: string | null,
  email: string | null
}

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  register(credentials: Partial<UserRegistration>) {
    return this.http.post<UserRegistration>('http://localhost:8080/api/users', credentials).subscribe(user =>
      console.log(user)
    );
  }
}
